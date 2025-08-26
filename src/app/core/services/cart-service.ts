import { inject, Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem, ProductResponse } from '../../shared/utils/models';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'local_cart';

  public cartItems = signal<CartItem[]>(this.getCartFromLocalStorage());

  constructor() {
    effect(() => {
      this.saveCartToLocalStorage(this.cartItems());
      console.log('update cart', this.cartItems());
    });
  }

  addToCart(product: ProductResponse): void {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(item => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      this.cartItems.set([...currentItems]);
    } else {
      const newItem: CartItem = {
        productId: product.id,
        quantity: 1
      };
      this.cartItems.set([...currentItems, newItem]);
    }
  }

  increaseQuantity(product: ProductResponse): void {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(item => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      this.cartItems.set([...currentItems]);
    } else {
      const newItem: CartItem = {
        productId: product.id,
        quantity: 1
      };
      this.cartItems.set([...currentItems, newItem]);
    }
  }

  decreaseQuantity(productId: number): void {
    this.cartItems.update(items => {
      const itemToUpdate = items.find(item => item.productId === productId);

      if (itemToUpdate) {
        if (itemToUpdate.quantity > 1) {
          itemToUpdate.quantity -= 1;
          return [...items]; 
        } else {
          return items.filter(item => item.productId !== productId);
        }
      }
      return items;
    });
  }

  removeFromCart(productId: number): void {
    this.cartItems.update(items => items.filter(item => item.productId !== productId));
  }

  clearCart(): void {
    this.cartItems.set([]);
  }

  private saveCartToLocalStorage(items: CartItem[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(items));
  }

  private getCartFromLocalStorage(): CartItem[] {
    const cartData = localStorage.getItem(this.cartKey);
    return cartData ? JSON.parse(cartData) : [];
  }
}