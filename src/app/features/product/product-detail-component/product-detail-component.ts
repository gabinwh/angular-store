import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of, startWith, Subscription, switchMap } from 'rxjs';
import { ProductService } from '../../../core/services/product-service';
import { ToastrService } from 'ngx-toastr';
import { ProductResponse } from '../../../shared/utils/models';
import { AuthService } from '../../../core/services/auth-service';
import { CartService } from '../../../core/services/cart-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-detail-component',
  standalone: false,
  templateUrl: './product-detail-component.html',
  styleUrl: './product-detail-component.scss'
})
export class ProductDetailComponent {

  private routeActivated = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private toastrService = inject(ToastrService);
  private destroyRef = inject(DestroyRef);

  data$: Observable<{ loading: boolean, error: boolean, product: ProductResponse | null }> = this.routeActivated.paramMap.pipe(
    map(params => Number(params.get('id'))),
    switchMap(id =>
      this.productService.getProductById(id).pipe(
        map(product => ({
          loading: false,
          error: false,
          product: product
        })),
        catchError(() => {
          this.toastrService.error("Unable to load product!");
          return of({
            loading: false,
            error: true,
            product: null
          });
        }),
        startWith({
          loading: true,
          error: false,
          product: null
        })
      )
    )
  );

  ngOnInit(): void {
    this.data$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: state => {
          if (!state.error && !state.loading) {
            this.toastrService.success("Product loaded successfully!");
          }
        }
      });
  }

  addToCart(product: ProductResponse): void {
    if (this.authService.isLoggedIn()) {
      this.cartService.addToCart(product); ''
      this.toastrService.success('You have added this item to your cart.');
    } else {
      this.toastrService.info('You must be logged in to add products to your cart.', 'Attention');
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url }
      });
    }
  }
}
