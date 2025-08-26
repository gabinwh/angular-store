import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, forkJoin, map, of, switchMap } from 'rxjs';
import { CartService } from '../../../core/services/cart-service';
import { ProductService } from '../../../core/services/product-service';
import { CartProduct, ProductResponse } from '../../../shared/utils/models';

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

    const productsInCart = this.cartService.cartItems();

    if (productsInCart.length === 0) {
      this.cartProducts = [];
      this.isLoading = false;
      this.calculateTotalPrice();
      return;
    }

    const productRequests = productsInCart.map(item =>
      this.productService.getProductById(item.productId)
    );

    forkJoin(productRequests).pipe(
      map(fetchedProducts => {
        return fetchedProducts.map((product, index) => ({
          ...product,
          quantity: productsInCart[index].quantity
        }));
      }),
      catchError(error => {
        this.toastrService.error('Failed to load product data.', 'Error');
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
    this.cartService.removeFromCart(productId);
    this.toastrService.info('Item removed from cart!', 'Info');
    this.getCartProducts();
  }

  decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
    this.toastrService.info('Quantidade do item diminuída!', 'Info');
    this.getCartProducts();
  }

  // Novo método para aumentar a quantidade
  increaseQuantity(product: ProductResponse): void {
    this.cartService.increaseQuantity(product);
    this.toastrService.info('Quantidade do item aumentada!', 'Info');
    this.getCartProducts();
  }

  onCheckout(): void {
    this.toastrService.info("Functionality under development.", 'Info')
  }
}
