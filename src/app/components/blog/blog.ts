import { CommonModule } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, Title, Meta } from '@angular/platform-browser';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  summary: string;
  tags: string[];
  content: (string | { type: 'text', content: string } | { type: 'image', src: string, alt: string, caption?: string } | { type: 'youtube', url: string, title?: string })[];
  image?: string;
  readTime?: string;
}

interface BlogSummary {
  id: string;
  title: string;
  summary: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
  readonly blog = signal<BlogPost | null>(null);
  readonly allBlogs = signal<BlogSummary[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');

  readonly recommendedBlogs = computed(() => {
    const currentBlog = this.blog();
    const allBlogs = this.allBlogs();
    if (!currentBlog || allBlogs.length === 0) return [];

    const relatedPosts = allBlogs
      .filter(b => b.id !== currentBlog.id)
      .map(b => ({
        ...b,
        matchedTags: b.tags.filter(tag => currentBlog.tags.includes(tag)).length,
      }))
      .filter(b => b.matchedTags > 0);

    if (relatedPosts.length === 0) return [];

    const sortedByRelevance = relatedPosts.sort((a, b) => b.matchedTags - a.matchedTags);
    const topRelevant = sortedByRelevance.slice(0, 6);

    for (let i = topRelevant.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [topRelevant[i], topRelevant[j]] = [topRelevant[j], topRelevant[i]];
    }

    return topRelevant.slice(0, 3).map(({ matchedTags, ...blog }) => blog);
  });

  readonly shouldShowBlogContent = computed(() => {
    return this.blog() && !this.loading() && !this.error();
  });

  readonly readTime = computed(() => {
    const post = this.blog();
    if (!post) return '5 min read';

    const wordCount = post.content.reduce((count, item) => {
      if (typeof item === 'string') {
        return count + item.split(' ').length;
      } else if (item.type === 'text') {
        return count + item.content.split(' ').length;
      }
      return count;
    }, 0);

    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min read`;
  });

  constructor(route: ActivatedRoute, private sanitizer: DomSanitizer, private title: Title, private meta: Meta) {
    route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadBlog(id);
        this.loadAllBlogs();
      } else {
        this.error.set('Invalid blog link.');
        this.loading.set(false);
      }
    });
  }

  private async loadBlog(id: string) {
    this.loading.set(true);
    this.error.set('');
    this.blog.set(null);

    try {
      const response = await fetch(`/blogs/${id}.json`);
      if (!response.ok) {
        throw new Error('Blog not found');
      }

      const data = (await response.json()) as BlogPost;
      this.blog.set(data);
      this.updateBlogMetadata(data);
    } catch (error) {
      this.error.set('Unable to load the blog post.');
      console.error(error);
    } finally {
      this.loading.set(false);
    }
  }

  private async loadAllBlogs() {
    try {
      const response = await fetch('/blogs/blogs.json');
      if (response.ok) {
        const blogs = await response.json();
        this.allBlogs.set(blogs);
      }
    } catch (error) {
      console.error('Failed to load blogs for recommendations:', error);
    }
  }

  isTextContent(item: any): item is string | { type: 'text', content: string } {
    return typeof item === 'string' || (item && item.type === 'text');
  }

  isImageContent(item: any): item is { type: 'image', src: string, alt: string, caption?: string } {
    return item && item.type === 'image';
  }

  isYouTubeContent(item: any): item is { type: 'youtube', url: string, title?: string } {
    return item && item.type === 'youtube';
  }

  getYouTubeVideoId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  }

  getSafeYouTubeUrl(url: string): SafeResourceUrl | null {
    const videoId = this.getYouTubeVideoId(url);
    if (!videoId) return null;
    const iframeUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(iframeUrl);
  }

  private updateBlogMetadata(post: BlogPost) {
    const pageTitle = `${post.title} | Shiva's Portfolio`;
    this.title.setTitle(pageTitle);

    this.meta.updateTag({ name: 'description', content: post.summary });
    this.meta.updateTag({ name: 'keywords', content: post.tags.join(', ') });
    this.meta.updateTag({ name: 'author', content: post.author });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: post.summary });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: post.summary });
  }

  getTextContent(item: string | { type: 'text', content: string }): string {
    return typeof item === 'string' ? item : item.content;
  }

  shareOnTwitter(post: BlogPost) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out "${post.title}" by ${post.author}`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  }

  shareOnLinkedIn(post: BlogPost) {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  }

  async copyLink(post: BlogPost) {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
      alert('Link copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  }
}

