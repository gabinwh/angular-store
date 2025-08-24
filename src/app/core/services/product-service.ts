import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponse } from '../../shared/utils/models';

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
}
