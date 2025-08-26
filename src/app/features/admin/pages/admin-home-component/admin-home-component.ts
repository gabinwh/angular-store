import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product-service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { UserService } from '../../../../core/services/user-service';

@Component({
  selector: 'app-admin-home-component',
  standalone: false,
  templateUrl: './admin-home-component.html',
  styleUrl: './admin-home-component.scss'
})
export class AdminHomeComponent implements OnInit {
  productCount: number = 0;
  userCount: number = 0;
  isLoading: boolean = true; 

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchAdminDashboardData();
  }

  fetchAdminDashboardData(): void {
    this.isLoading = true;

    forkJoin({
      products: this.productService.getAllProducts(),
      users: this.userService.getAllUsers()
    }).pipe(
      catchError(error => {
        this.toastrService.error('Unable to load dashboard data!', 'Error');
        return of({ products: [], users: [] }); 
      }),
      finalize(() => {
        this.isLoading = false; 
      })
    ).subscribe(data => {
      this.productCount = data.products.length;
      this.userCount = data.users.length;
      this.toastrService.success("Dashboard data loaded successfully!");
    });
  }

  goToProductsTable(): void {
    this.router.navigate(['/admin/products']);
  }
}