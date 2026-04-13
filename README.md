# Shiva's Portfolio

A modern, professional portfolio website showcasing projects, experience, skills, and blog articles. Built with Angular 17+ and optimized for performance and SEO.

## Features

- **Portfolio Section**: Comprehensive resume-style layout with hero section, tech stack, current projects, and experience
- **Blog System**: Dynamic blog listings with search, filtering, and pagination
- **Individual Blog Pages**: Rich blog posts with images, YouTube videos, related articles, and social sharing
- **Responsive Design**: Mobile-first approach with glassmorphism effects
- **SEO Optimized**: Dynamic meta tags, Open Graph support, and semantic HTML
- **Static-First**: JSON-driven content architecture for easy content management
- **No Backend Required**: Pure frontend solution with public assets

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
