import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { ProductAdd } from './components/product-add/product-add';
import { ProductEdit } from './components/product-edit/product-edit';
import { Home } from './components/home/home';

export const routes: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' }, // Ruta por defecto
    { path: 'list', component: ProductList },
    { path: 'create', component: ProductAdd },
    { path: 'edit/:id', component: ProductEdit }, // Ruta para editar un producto con id
];
