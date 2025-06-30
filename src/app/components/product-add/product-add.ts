import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.html',
  styleUrl: './product-add.css',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule]
})
export class ProductAdd {
  name: string = '';
  price: number = 0;
  email: string = '';
  date: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  onSubmit(): void {
    const newProduct = {name: this.name, price: this.price, email: this.email, date: this.date} as Omit<Product, 'id'>;
    this.productService.addProduct(newProduct).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }
}
