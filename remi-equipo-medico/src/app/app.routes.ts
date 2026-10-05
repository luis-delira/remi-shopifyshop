import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'REMI Equipo Médico | Venta y Renta de Equipo Médico',
  },
  {
    path: 'productos',
    loadComponent: () =>
      import('./pages/products/products.component').then((m) => m.ProductsComponent),
    title: 'Productos | REMI Equipo Médico',
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
    title: 'Nosotros | REMI Equipo Médico',
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./pages/contact/contact.component').then((m) => m.ContactComponent),
    title: 'Contacto | REMI Equipo Médico',
  },
  { path: '**', redirectTo: '' },
];
