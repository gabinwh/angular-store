import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../../../core/services/product-service';
import { Product, ProductResponse } from '../../../../../shared/utils/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-edit-proudct',
  standalone: false,
  templateUrl: './create-edit-proudct.html',
  styleUrl: './create-edit-proudct.scss'
})
export class CreateEditProudct {

  @Input() productToEdit: ProductResponse | null = null;

  form!: FormGroup;
  isSending: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private productService: ProductService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();

    if (this.productToEdit) {
      this.form.patchValue(this.productToEdit);
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  getErrorMessage(campo: string): string | undefined {
    const control = this.form.get(campo);

    if (!control || !control.errors) return undefined;

    if (control.hasError('required')) return 'Mandatory field.';
    if (control.hasError('min')) return 'The price must be greater than 0.';

    return undefined;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isSending = true;

      let body: Product = {
        title: this.form.get('title')?.value,
        category: this.form.get('category')?.value,
        price: this.form.get('price')?.value,
        image: this.form.get('image')?.value,
        description: this.form.get('description')?.value,

      }

      if (this.productToEdit && this.productToEdit.id) {

        this.productService.updateProduct(this.productToEdit.id, body).subscribe({
          next: () => {
            this.toastrService.success("Product updated successfully!");
            this.activeModal.close();
          },
          error: () => {
            this.toastrService.error("Failed to update the product.");
          },
          complete: () => {
            this.isSending = false;
          }
        });
      } else {

        this.productService.createProduct(body).subscribe({
          next: () => {
            this.toastrService.success("Product created successfully!");
            this.activeModal.close();
          },
          error: () => {
            this.toastrService.error("Failed to create the product.");
          },
          complete: () => {
            this.isSending = false;
          }
        });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
