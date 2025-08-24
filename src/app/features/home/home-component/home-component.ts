import { Component, inject } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';
import { ProductResponse } from '../../../shared/utils/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-component',
  standalone: false,
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss'
})
export class HomeComponent {

  private productService = inject(ProductService);
  private toastrService = inject(ToastrService);
  products: ProductResponse[] = []
  isProductsLoading: boolean = false;

  ngOnInit(): void {
    this.isProductsLoading = true;
    this.productService.getAllProducts().subscribe({
      next: productResponse => {
        this.products = productResponse;
        this.toastrService.success("Products loaded successfully!");
      },
      error: error => {
        this.toastrService.error("Unable to load products!");
      },
      complete: () => {
        this.isProductsLoading = false;
      }
    });
  }
}
