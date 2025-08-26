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
  isDeleting: boolean = false;
  hasError: boolean = false;
  selectedProduct: ProductResponse | null = null;

  @ViewChild('viewProductModal') viewProductModal!: TemplateRef<any>;
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal!: TemplateRef<any>;

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
        this.toastrService.success("Products data loaded successfully!");
      },
      error: (error) => {
        this.hasError = true;
        this.toastrService.error("Failed to load products.", "Error");
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  openAddProductModal(): void {
    this.toastrService.info('Add Product functionality is not yet implemented.');
  }

  viewProduct(product: ProductResponse): void {
    this.selectedProduct = product;
    this.modalService.open(this.viewProductModal, { size: 'lg' });
  }

  editProduct(product: any): void {
    this.toastrService.info(`Editing product: ${product.title}`);
  }

  openDeleteModal(product: ProductResponse): void {
    this.selectedProduct = product;
    this.modalService.open(this.deleteConfirmationModal, { size: 'md' });
  }

  deleteProduct(productId: number | undefined | null): void {
    if (productId) {
      this.isDeleting = true;
      this.productService.deleteProductById(productId).subscribe({
        next: () => {
          this.toastrService.success("Products deleted successfully!");
          this.modalService.dismissAll();
        },
        error: (error) => {
          this.toastrService.error("Failed to delete the product.", "Error");
        },
        complete: () => {
          this.isDeleting = false;
        }
      });
    }
  }
}
