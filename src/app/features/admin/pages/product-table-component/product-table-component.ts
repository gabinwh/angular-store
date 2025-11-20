import {
  Component,
  DestroyRef,
  inject,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ProductService } from '../../../../core/services/product-service';
import { ToastrService } from 'ngx-toastr';
import {
  ProductResponse,
  StateProductsResponse,
} from '../../../../shared/utils/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateEditProudct } from '../modals/create-edit-proudct/create-edit-proudct';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, of, startWith } from 'rxjs';

@Component({
  selector: 'app-product-table-component',
  standalone: false,
  templateUrl: './product-table-component.html',
  styleUrl: './product-table-component.scss',
})
export class ProductTableComponent {
  isDeleting: boolean = false;
  selectedProduct: ProductResponse | null = null;
  state$!: Observable<StateProductsResponse>;

  @ViewChild('viewProductModal') viewProductModal!: TemplateRef<any>;
  @ViewChild('deleteConfirmationModal')
  deleteConfirmationModal!: TemplateRef<any>;

  private productService = inject(ProductService);
  private toastrService = inject(ToastrService);
  private modalService = inject(NgbModal);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.state$ = this.fetchProducts();
  }

  private fetchProducts(): Observable<StateProductsResponse> {
    return this.productService.getAllProducts().pipe(
      map((products) => {
        this.toastrService.success('Products data loaded successfully!');
        return {
          loading: false,
          error: false,
          products,
        };
      }),
      catchError(() => {
        this.toastrService.error('Failed to load products.', 'Error');
        return of({
          loading: false,
          error: true,
          products: [],
        });
      }),
      startWith({
        loading: true,
        error: false,
        products: [],
      })
    );
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
      this.productService
        .deleteProductById(productId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.toastrService.success('Product deleted successfully!');
            this.modalService.dismissAll();
          },
          error: (error) => {
            this.toastrService.error('Failed to delete the product.', 'Error');
          },
          complete: () => {
            this.isDeleting = false;
          },
        });
    }
  }
}
