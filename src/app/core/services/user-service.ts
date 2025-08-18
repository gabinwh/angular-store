import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserResponse } from '../../shared/utils/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://fakestoreapi.com/users';

  constructor(private http: HttpClient) { }

  createUser(newUser: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.apiUrl, newUser);
  }
}
