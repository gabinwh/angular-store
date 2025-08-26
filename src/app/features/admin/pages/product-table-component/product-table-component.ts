import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ProductService } from '../../../../core/services/product-service';
import { ToastrService } from 'ngx-toastr';
import { ProductResponse } from '../../../../shared/utils/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateEditProudct } from '../modals/create-edit-proudct/create-edit-proudct';

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
    const modalRef = this.modalService.open(CreateEditProudct, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });
  }

  viewProduct(product: ProductResponse): void {
    this.selectedProduct = product;
    this.modalService.open(this.viewProductModal, { size: 'lg' });
  }

  openEditProductModal(product: ProductResponse): void {
    const modalRef = this.modalService.open(CreateEditProudct, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.productToEdit = product;
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
          this.toastrService.success("Product deleted successfully!");
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
