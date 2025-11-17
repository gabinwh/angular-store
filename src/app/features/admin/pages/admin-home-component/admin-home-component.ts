import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product-service';
import { ToastrService } from 'ngx-toastr';
import { of, Observable } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { UserService } from '../../../../core/services/user-service';
import { StateDashboardResponse } from '../../../../shared/utils/models';

@Component({
  selector: 'app-admin-home-component',
  standalone: false,
  templateUrl: './admin-home-component.html',
  styleUrl: './admin-home-component.scss',
})
export class AdminHomeComponent {
  private productService = inject(ProductService);
  private userService = inject(UserService);
  private toastrService = inject(ToastrService);
  private router = inject(Router);

  productsState$ = this.fetchProductsDashboard();
  usersState$ = this.fetchUsersDashboard();

  private fetchProductsDashboard(): Observable<StateDashboardResponse> {
    return this.productService.getAllProducts().pipe(
      map((products) => {
        return {
          loading: false,
          error: false,
          count: products.length,
        };
      }),
      catchError(() => {
        this.toastrService.error('Unable to load product dashboard data!', 'Error');
        return of({
          loading: false,
          error: true,
          count: 0,
        });
      }),
      startWith({
        loading: true,
        error: false,
        count: 0,
      })
    );
  }

  private fetchUsersDashboard(): Observable<StateDashboardResponse> {
    return this.userService.getAllUsers().pipe(
      map((users) => {
        return {
          loading: false,
          error: false,
          count: users.length,
        };
      }),
      catchError(() => {
        this.toastrService.error('Unable to load user dashboard data!', 'Error');
        return of({
          loading: false,
          error: true,
          count: 0,
        });
      }),
      startWith({
        loading: true,
        error: false,
        count: 0,
      })
    );
  }

  goToProductsTable(): void {
    this.router.navigate(['/admin/products']);
  }
}
