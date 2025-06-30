// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs'; // Importa 'throwError'
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private products: Product[] = [
        { id: 1, name: 'Product 1', price: 100, email: 'product1@gmail.com', date: '2025-01-01'},
        { id: 2, name: 'Product 2', price: 200, email: 'product2@gmail.com', date: '2025-01-02'},
    ];

    private productSubject = new BehaviorSubject<Product[]>(this.products);

    constructor() {}

    getProducts(): Observable<Product[]> {
        return this.productSubject.asObservable();
    }

    getProductById(id: number): Observable<Product | undefined> {
        const foundProduct = this.products.find(product => product.id === id);
        return of(foundProduct);
    }

    // Función de validación interna
    private validateProduct(product: Omit<Product, 'id'> | Product): string[] {
        const errors: string[] = [];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (product.price < 0) {
            errors.push('El precio no puede ser negativo.');
        }
        if (!emailRegex.test(product.email)) {
            errors.push('El formato del email no es válido.');
        }
        // Puedes añadir más validaciones aquí
        if (!product.name || product.name.trim().length === 0) {
            errors.push('El nombre es requerido.');
        }
        if (typeof product.price !== 'number' || isNaN(product.price)) {
            errors.push('El precio debe ser un número válido.');
        }
        if (!product.date || product.date.trim().length === 0) {
             errors.push('La fecha es requerida.');
        }

        return errors;
    }

    addProduct(product: Omit<Product, 'id'>): Observable<Product> {
        const errors = this.validateProduct(product);
        if (errors.length > 0) {
            return throwError(() => new Error(errors.join(', '))); // Lanza un error si hay problemas
        }

        const newId = Math.max(...this.products.map(p => p.id || 0)) + 1;
        const newProduct: Product = { ...product, id: newId };
        this.products.push(newProduct);
        this.productSubject.next([...this.products]);
        return of(newProduct); // Devuelve el producto añadido como un Observable
    }

    updateProduct(updatedProduct: Product): Observable<Product> { 
        const errors = this.validateProduct(updatedProduct);
        if (errors.length > 0) {
            return throwError(() => new Error(errors.join(', '))); // Lanza un error
        }

        const index = this.products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
            this.products[index] = { ...updatedProduct };
            this.productSubject.next([...this.products]);
            return of(updatedProduct); // Devuelve el producto actualizado
        }
        return throwError(() => new Error('Producto no encontrado para actualizar.')); // Manejo de error
    }

    deleteProduct(id: number): Observable<boolean> {
        const initialLength = this.products.length;
        this.products = this.products.filter(product => product.id !== id);
        this.productSubject.next([...this.products]);
        return of(this.products.length < initialLength);
    }
}