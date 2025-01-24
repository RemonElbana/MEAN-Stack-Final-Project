// frontend/src/app/components/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { PriceFormatPipe } from '../../pipes/price-format.pipe';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, PriceFormatPipe, RouterModule],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.fetchProducts().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.products = response.data.products;
        }
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  onDelete(productId: string): void {
    if (!this.authService.isLoggedIn()) {
      Swal.fire({
        title: "Delete?",
        text: "You need to be logged in to delete a product. Do you want to log in?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, log in!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(productId).subscribe({
          next: (response) => {
            if (response.status === 'success') {
              this.products = this.products.filter(product => product._id !== productId);
              Swal.fire('Product deleted successfully!');
            }
          },
          error: (err) => {
            console.error('Error deleting product:', err);
          },
        });
      }
    });
  }

  onEdit(productId: string): void {
    this.router.navigate([`/products/edit/${productId}`]);
  }

}
