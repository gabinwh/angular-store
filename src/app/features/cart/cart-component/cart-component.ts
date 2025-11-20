import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, finalize, forkJoin, map, Observable, of, startWith, switchMap } from 'rxjs';
import { CartService } from '../../../core/services/cart-service';
import { ProductService } from '../../../core/services/product-service';
import { CartProduct, CartState, ProductResponse } from '../../../shared/utils/models';

@Component({
  selector: 'app-cart-component',
  standalone: false,
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.scss'
})
export class CartComponent {

  constructor(
    private toastrService: ToastrService,
    private cartService: CartService,
    private productService: ProductService
  ) { }

  private refreshCartSubject = new BehaviorSubject<void>(undefined);

  cartState$!: Observable<CartState>;

  ngOnInit(): void {
    this.cartState$ = this.fetchCartState();
  }

  private fetchCartState(): Observable<CartState> {
    return this.refreshCartSubject.pipe(
      startWith(undefined),
      switchMap(() => {
        const productsInCart = this.cartService.cartItems();

        if (productsInCart.length === 0) {
          return of({
            loading: false,
            error: false,
            cartProducts: [],
            totalPrice: 0,
          } as CartState);
        }

        const productRequests = productsInCart.map(item =>
          this.productService.getProductById(item.productId).pipe(
            map(product => ({ ...product, quantity: item.quantity } as CartProduct))
          )
        );

        return forkJoin(productRequests).pipe(
          map(products => {
            return {
              loading: false,
              error: false,
              cartProducts: products,
              totalPrice: this.calculateTotalPrice(products),
            };
          }),
          catchError(error => {
            this.toastrService.error('Failed to load product data.', 'Error');
            return of({
              loading: false,
              error: true,
              cartProducts: [],
              totalPrice: 0,
            } as CartState);
          }),
          startWith({
            loading: true,
            error: false,
            cartProducts: [],
            totalPrice: 0,
          } as CartState)
        );
      })
    );
  }
  private calculateTotalPrice(products: CartProduct[]): number {
    return products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.toastrService.info('Item removed from cart!', 'Info');
    this.refreshCartSubject.next();
  }

  decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
    this.toastrService.info('Item quantity decreased!', 'Info');
    this.refreshCartSubject.next();
  }

  increaseQuantity(product: ProductResponse): void {
    this.cartService.increaseQuantity(product);
    this.toastrService.info('Item quantity increased!', 'Info');
    this.refreshCartSubject.next();
  }

  onCheckout(): void {
    this.toastrService.info("Functionality under development.", 'Info');
  }
}
