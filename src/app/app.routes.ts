import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent)
      },
      {
        path: 'products/:id',
        loadComponent: () => import('./pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
      },
      {
        path: 'favorites',
        loadComponent: () => import('./pages/favorites/favorites.component').then(m => m.FavoritesComponent)
      },
      // 👇 Ruta admin - SIN protección (el login está dentro)
      {
        path: 'admin',
        loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent)
      },
    ]
  },
  // Ruta 404
  { path: '**', redirectTo: '' }
];
