import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductResponse } from '../../shared/utils/models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private httpService = inject(HttpClient);

  private apiUrl = 'https://fakestoreapi.com/products';

  getAllProducts(): Observable<ProductResponse[]> {
    return this.httpService.get<ProductResponse[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<ProductResponse> {
    return this.httpService.get<ProductResponse>(`${this.apiUrl}/${id}`)
  }

  deleteProductById(id: number): Observable<void> {
    return this.httpService.delete<void>(`${this.apiUrl}/${id}`)
  }

  createProduct(newProduct: Product): Observable<ProductResponse> {
    return this.httpService.post<ProductResponse>(this.apiUrl, newProduct);
  }

  updateProduct(id: Number, newProduct: Product): Observable<ProductResponse> {
    return this.httpService.put<ProductResponse>(`${this.apiUrl}/${id}`, newProduct);
  }
}
