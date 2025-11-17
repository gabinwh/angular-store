import { Component, DestroyRef, inject } from '@angular/core';
import { ProductService } from '../../../core/services/product-service';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { StateProductsResponse } from '../../../shared/utils/models';

@Component({
  selector: 'app-home-component',
  standalone: false,
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {
  private productService = inject(ProductService);
  private toastrService = inject(ToastrService);

  state$ = this.fetchProducts();

  private fetchProducts(): Observable<StateProductsResponse> {
    return this.productService.getAllProducts().pipe(
      map((products) => ({
        loading: false,
        error: false,
        products,
      })),
      catchError(() => {
        this.toastrService.error('Unable to load product!');
        return of({
          loading: false,
          error: true,
          products: [],
        });
      }),
      startWith({
        loading: true,
        error: false,
        products: [],
      })
    );
  }
}
