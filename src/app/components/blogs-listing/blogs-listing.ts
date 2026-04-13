import { CommonModule } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface BlogSummary {
  id: string;
  title: string;
  summary: string;
  date: string;
  author: string;
  tags?: string[];
}

@Component({
  selector: 'app-blogs-listing',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './blogs-listing.html',
  styleUrl: './blogs-listing.css',
})
export class BlogsListing {
  readonly blogs = signal<BlogSummary[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');
  readonly searchQuery = signal('');
  readonly currentPage = signal(1);
  readonly pageSize = signal(6);

  // Computed: filtered blogs based on search query
  readonly filteredBlogs = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.blogs();

    return this.blogs().filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) ||
        blog.summary.toLowerCase().includes(query) ||
        blog.author.toLowerCase().includes(query) ||
        (blog.tags?.some((tag) => tag.toLowerCase().includes(query)) ?? false)
    );
  });

  // Computed: total pages
  readonly totalPages = computed(() =>
    Math.ceil(this.filteredBlogs().length / this.pageSize())
  );

  // Computed: paginated blogs for current page
  readonly paginatedBlogs = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredBlogs().slice(start, end);
  });

  // Computed: result count message
  readonly resultMessage = computed(() => {
    const total = this.filteredBlogs().length;
    const query = this.searchQuery();
    if (!query) return `Showing ${total} blog posts`;
    return `Found ${total} result${total !== 1 ? 's' : ''} for "${query}"`;
  });

  constructor() {
    this.loadBlogs();
  }

  private async loadBlogs() {
    this.loading.set(true);
    this.error.set('');

    try {
      const response = await fetch('/blogs/blogs.json');
      if (!response.ok) {
        throw new Error('Blog index not available');
      }

      const list = (await response.json()) as BlogSummary[];
      this.blogs.set(list);
      this.currentPage.set(1);
    } catch (error) {
      this.error.set('Unable to load blog listing.');
      console.error(error);
    } finally {
      this.loading.set(false);
    }
  }

  onSearch() {
    this.currentPage.set(1); // Reset to first page on search
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.goToPage(this.currentPage() + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const total = this.totalPages();
    const current = this.currentPage();
    const maxVisible = 5;

    if (total <= maxVisible) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 3) {
        for (let i = 1; i <= maxVisible; i++) pages.push(i);
      } else if (current >= total - 2) {
        for (let i = total - maxVisible + 1; i <= total; i++) pages.push(i);
      } else {
        for (let i = current - 2; i <= current + 2; i++) pages.push(i);
      }
    }

    return pages;
  }
}

