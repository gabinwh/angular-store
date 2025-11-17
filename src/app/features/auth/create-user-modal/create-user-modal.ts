import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../core/services/user-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create-user-modal',
  standalone: false,
  templateUrl: './create-user-modal.html',
  styleUrl: './create-user-modal.scss',
})
export class CreateUserModal {
  protected activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private toastrService = inject(ToastrService);
  private destroyRef = inject(DestroyRef);

  form!: FormGroup;
  isSaving: boolean = false;

  ngOnInit() {
    this.initForm();
    this.form.markAllAsTouched();
  }

  private initForm(): void {
    this.form = this.fb.group({
      username: [
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(1),
        ],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(3),
        ],
      ],
      email: [
        null,
        [
          Validators.email,
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
    });
  }

  getErrorMessage(campo: string): string | undefined {
    const control = this.form.get(campo);

    if (!control || !control.errors) return undefined;

    if (control.hasError('required')) return 'Mandatory field.';

    if (control.hasError('email')) return 'Invalid email.';

    if (control.hasError('maxlength')) {
      const erro = control.getError('maxlength');
      return `Maximum ${erro.requiredLength} characters allowed.`;
    }

    if (control.hasError('minlength')) {
      const erro = control.getError('minlength');
      return `Minimum ${erro.requiredLength} characters required.`;
    }

    return undefined;
  }

  defineToolTipBtnSave(): string | null {
    return !this.form.valid ? 'The form is invalid.' : null;
  }

  onRegister(): void {
    this.isSaving = true;
    if (this.form.valid) {
      this.userService
        .createUser(this.form.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (userResponse) => {
            this.toastrService.success(
              'Account created successfully!',
              'Success!'
            );
            this.activeModal.close();
          },
          error: (error) => {
            this.toastrService.error(
              'An error occurred while creating the account.',
              'Error'
            );
          },
          complete: () => {
            this.isSaving = false;
          },
        });
    }
  }
}
