import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartResponse, ProductResponse } from '../../shared/utils/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private httpService = inject(HttpClient);
  private apiUrl = 'https://fakestoreapi.com/carts';
  private idStatic: number = 1;

  //Vou fixar um cart em específico, 
  //pois a API deveria retornar o CART com base no token. 
  getCartById(id: number = this.idStatic): Observable<CartResponse> {
    return this.httpService.get<CartResponse>(`${this.apiUrl}/${id}`)
  }

  addToCart(product: ProductResponse): Observable<CartResponse>  {
    return this.httpService.put<CartResponse>(`${this.apiUrl}/${this.idStatic}`, product);
  }
}
