import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    },
    {
        path: 'products',
        loadComponent: () => import('./components/products/products.component').then(c => c.ProductsComponent)
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
