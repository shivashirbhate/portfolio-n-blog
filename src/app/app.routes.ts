import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/main-cv/main-cv').then((m) => m.MainCv)
  },
  {
    path: 'blogs',
    loadComponent: () =>
      import('./components/blogs-listing/blogs-listing').then((m) => m.BlogsListing)
  },
  {
    path: 'blog/:id',
    loadComponent: () =>
      import('./components/blog/blog').then((m) => m.Blog)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
