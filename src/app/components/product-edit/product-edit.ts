import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.css',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ]
})
export class ProductEdit implements OnInit {
  product: Product | undefined;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe(product => {
      this.product = product;
    }); 
  }

  onSubmit(): void {
    if (this.product) {
      this.productService.updateProduct(this.product).subscribe(() => {
        this.router.navigate(['/list']);
      });
    }
  }
  
}

