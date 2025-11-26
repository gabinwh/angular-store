import {
  Component,
  ElementRef,
  inject,
  ViewChild,
  DestroyRef,
} from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CreateUserModal } from '../create-user-modal/create-user-modal';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, finalize } from 'rxjs';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {
  @ViewChild('credentialsModalContent') credentialsModalContent:
    | ElementRef
    | undefined;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private modalService = inject(NgbModal);
  private toastrService = inject(ToastrService);
  private routeActivated = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  // Reativos para estado
  private isSendingSubject = new BehaviorSubject<boolean>(false);
  isSending$ = this.isSendingSubject.asObservable();
  private isCredentialsLoadingSubject = new BehaviorSubject<boolean>(false);
  isCredentialsLoading$ = this.isCredentialsLoadingSubject.asObservable();
  private credentialsSubject = new BehaviorSubject<any[]>([]);
  credentials$ = this.credentialsSubject.asObservable();
  // Reativo para mensagem de erro
  private errorMessageSubject = new BehaviorSubject<string | null>(null);
  errorMessage$ = this.errorMessageSubject.asObservable();
  //
  form!: FormGroup;
  private returnUrl: string | null = null;

  ngOnInit() {
    this.initForm();
    this.form.markAllAsTouched();
    this.returnUrl =
      this.routeActivated.snapshot.queryParamMap.get('returnUrl');
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100),
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
    });
  }

  getErrorMessage(campo: string): string | undefined {
    const control = this.form.get(campo);

    if (!control || !control.errors) return undefined;

    if (control.hasError('required')) return 'Mandatory field.';

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

  onLogin(): void {
    if (!this.form.valid) return;
    this.isSendingSubject.next(true);
    this.authService
      .login(this.form.value)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isSendingSubject.next(false)
        })
      )
      .subscribe({
        next: (data) => {
          this.errorMessageSubject.next(null);
          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.router.navigate(['/home']);
          }
          this.toastrService.success('Login successful!');
        },
        error: (error) => {
          this.errorMessageSubject.next('Invalid username or password. Please try again.');
          this.toastrService.error('Unable to login!');
        }
      });
  }

  openRegisterModal(): void {
    const modalRef: NgbModalRef = this.modalService.open(CreateUserModal, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
  }
}
