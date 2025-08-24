import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, forkJoin, map, of, switchMap } from 'rxjs';
import { CartService } from '../../../core/services/cart-service';
import { ProductService } from '../../../core/services/product-service';
import { CartProduct } from '../../../shared/utils/models';

@Component({
  selector: 'app-cart-component',
  standalone: false,
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.scss'
})
export class CartComponent {
  cartProducts: CartProduct[] = [];
  totalPrice: number = 0;
  isLoading: boolean = true;

  constructor(
    private toastrService: ToastrService,
    private cartService: CartService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts(): void {
    this.isLoading = true;

    this.cartService.getCartById().pipe(
      switchMap(cart => {
        const productsInCart = cart.products;

        if (productsInCart.length === 0) {
          return of([]);
        }

        const productRequests = productsInCart.map(item =>
          this.productService.getProductById(item.productId)
        );

        return forkJoin(productRequests).pipe(
          map(fetchedProducts => {
            return fetchedProducts.map((product, index) => ({
              ...product,
              quantity: productsInCart[index].quantity
            }));
          })
        );
      }),
      catchError(error => {
        this.toastrService.error('Failed to load cart data.', 'Error');
        return of([]);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(products => {
      this.cartProducts = products;
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  removeFromCart(productId: number): void {
    //Implementação apenas visual, pois é uma FakeAPI
    this.toastrService.info('Item removed from cart!', 'Info');
    const cartProductsFiltered = this.cartProducts.filter(item => item.id !== productId);
    this.cartProducts = cartProductsFiltered
    this.calculateTotalPrice();
  }
}
