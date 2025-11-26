import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, finalize } from 'rxjs';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-create-user-modal',
  standalone: false,
  templateUrl: './create-user-modal.html',
  styleUrl: './create-user-modal.scss',
})
export class CreateUserModal {
  protected activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastrService = inject(ToastrService);
  private destroyRef = inject(DestroyRef);

  form!: FormGroup;
  //Controla o estado
  private isSendingSubject = new BehaviorSubject<boolean>(false);
  isSending$ = this.isSendingSubject.asObservable();

  ngOnInit() {
    this.initForm();
    this.form.markAllAsTouched();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(20), Validators.minLength(1)]],
      password: [null, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      email: [null, [Validators.email, Validators.required, Validators.maxLength(150), Validators.minLength(3)]],
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
    this.isSendingSubject.next(true);
    if (this.form.valid) {
      this.authService
        .register(this.form.value)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          finalize(() => {
            this.isSendingSubject.next(false)
          })
        )
        .subscribe({
          next: (registerResponse) => {
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
          }
        });
    }
  }
}
