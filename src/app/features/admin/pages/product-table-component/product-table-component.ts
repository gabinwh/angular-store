import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ProductService } from '../../../../core/services/product-service';
import { ToastrService } from 'ngx-toastr';
import { ProductResponse } from '../../../../shared/utils/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-table-component',
  standalone: false,
  templateUrl: './product-table-component.html',
  styleUrl: './product-table-component.scss'
})
export class ProductTableComponent {
  products: ProductResponse[] = [];
  isLoading: boolean = true;
  hasError: boolean = false;
  selectedProduct: ProductResponse | null = null;

  @ViewChild('viewProductModal') viewProductModal!: TemplateRef<any>;

  constructor(
    private productService: ProductService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.isLoading = false;
        this.toastrService.success("Products data loaded successfully!");
      },
      error: (error) => {
        this.isLoading = false;
        this.hasError = true;
        this.toastrService.error("Failed to load products.", "Error");
        console.error('There was an error fetching the products:', error);
      }
    });
  }

  openAddProductModal(): void {
    this.toastrService.info('Add Product functionality is not yet implemented.');
  }

  viewProduct(product: any): void {
    this.selectedProduct = product;
    this.modalService.open(this.viewProductModal, { size: 'lg' });
  }

  editProduct(product: any): void {
    this.toastrService.info(`Editing product: ${product.title}`);
  }

  deleteProduct(productId: number): void {
    this.toastrService.warning(`Deleting product with ID: ${productId}`);
  }
}
