import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';
import { ProductService } from '../../../core/services/product-service';
import { ToastrService } from 'ngx-toastr';
import { ProductResponse } from '../../../shared/utils/models';
import { AuthService } from '../../../core/services/auth-service';
import { CartService } from '../../../core/services/cart-service';

@Component({
  selector: 'app-product-detail-component',
  standalone: false,
  templateUrl: './product-detail-component.html',
  styleUrl: './product-detail-component.scss'
})
export class ProductDetailComponent {

  product: ProductResponse = {} as ProductResponse;
  isProductLoading: boolean = false;
  hasError: boolean = false;
  productId: number | null = null;
  private routeSub: Subscription | undefined;

  constructor(
    private routeActivated: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.isProductLoading = true;
    this.hasError = false;
    this.routeSub = this.routeActivated.paramMap.subscribe((params: ParamMap) => {
      this.productId = Number(params.get('id'));
      if (this.productId) {

        this.productService.getProductById(this.productId).subscribe({
          next: data => {
            this.product = data;
            this.toastrService.success("Product data loaded successfully!");
          },
          error: error => {
            this.toastrService.error("Unable to load credentials!");
            this.hasError = true;
          },
          complete: () => {
            this.isProductLoading = false;
          }
        });
      } else {
        this.hasError = true;
        this.toastrService.error("Error loading product data!");
      }
    });
  }

  addToCart(): void {
    if (this.authService.isLoggedIn()) {
      this.cartService.updateCart([this.product]).subscribe({
        next: data => {
          this.toastrService.success('Product added to cart!', 'Success!');
          this.router.navigate(['/cart'])
        },
        error: error => {
          this.toastrService.error("Unable to add the product!");
        }
      });
    } else {
      this.toastrService.info('You must be logged in to add products to your cart.', 'Attention');
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
