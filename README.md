# Shiva's Portfolio

A modern, professional portfolio website showcasing projects, experience, skills, and blog articles. Built with Angular 17+ and optimized for performance and SEO.

## Features

- **Portfolio Section**: Hero section with personal introduction, current role, and call-to-action buttons; Quick contact bar with email links; Technology stack showcase organized by categories; Currently working on section with project status badges; Personal projects gallery with GitHub links, tech stack tags, and live demo links; Professional experience timeline with role highlights
- **Blog System**: Blog listing page with hero section, search functionality (searches across titles, summaries, authors, and tags), pagination controls, and blog cards displaying metadata, tags, and summaries
- **Individual Blog Pages**: Rich blog posts with hero images, publication metadata (date, author, estimated read time), tag display; Content supporting text paragraphs, images with captions, embedded YouTube videos, and syntax-highlighted code blocks with copy functionality; Social sharing buttons for Twitter, LinkedIn, and link copying; Recommended articles section based on tag matching
- **Responsive Design**: Mobile-first responsive layout with glassmorphism visual effects, CSS Grid and Flexbox for modern layouts
- **SEO Optimized**: Dynamic meta tags for each page, Open Graph support for social media sharing, and semantic HTML structure
- **Static-First Architecture**: JSON-driven content management for portfolio data and blog posts, enabling easy updates without code changes
- **No Backend Required**: Pure frontend application using public assets, with lazy-loaded components for optimal performance

## Tech Stack

- **Framework**: Angular 17+ (Standalone Components)
- **Language**: TypeScript
- **Styling**: CSS3 (Responsive, Grid, Flexbox, Animations)
- **State Management**: Angular Signals & Computed Properties
- **Routing**: Client-side routing with lazy loading
- **Build Tool**: Angular CLI & Vite

## Quick Start

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
# Clone or download the project
cd code

# Install dependencies
npm install

# Start development server
npm start
```

Navigate to `http://localhost:4200/`. The app reloads on file changes.

### Build for Production

```bash
npm run build
```

Artifacts are stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/          # Navigation header
│   │   ├── footer/          # Footer with contact & license
│   │   ├── main-cv/         # Portfolio/Resume page
│   │   ├── blogs-listing/   # Blog listing with search
│   │   └── blog/            # Individual blog post page
│   ├── app.routes.ts        # Routing configuration
│   └── app.ts               # Root component
├── styles.css               # Global styles
└── main.ts                  # Entry point

public/
├── blogs/
│   ├── blogs.json           # Blog index
│   └── blog-*.json          # Individual blog content
├── portfolio-data.json      # Portfolio content
├── favicon.svg              # Favicon
└── robots.txt               # Search engine directives

LICENSE                       # Private portfolio license
```

## Content Management

All content is managed via JSON files in the `public/` folder:

- **`public/portfolio-data.json`**: Portfolio sections, tech stack, projects
- **`public/blogs/blogs.json`**: Blog index with metadata
- **`public/blogs/blog-*.json`**: Individual blog post content

Edit these files to update portfolio and blog content without modifying code.

## License

⚠️ **PRIVATE & CONFIDENTIAL**

This is a private portfolio website. All content, code, and design are the exclusive property of Shiva. 

Unauthorized copying, distribution, or use is **strictly prohibited** and constitutes copyright infringement.

See [LICENSE](/LICENSE) for full details.

---

**Last Updated**: April 13, 2026
