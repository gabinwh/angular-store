import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CreateUserModal } from '../create-user-modal/create-user-modal';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../core/services/user-service';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss'
})
export class LoginComponent {

  @ViewChild('credentialsModalContent') credentialsModalContent: ElementRef | undefined;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal,
    private toastrService: ToastrService,
  ) { }

  form!: FormGroup;
  errorMessage: string | null = null;
  isCredentialsLoading: boolean = false;
  credentials: any = []

  ngOnInit() {

    this.initForm();
    this.form.markAllAsTouched();
  }

  openCredentialsModal(): void {
    if (this.credentialsModalContent) {
      this.isCredentialsLoading = true;
      this.modalService.open(this.credentialsModalContent);
      this.userService.getAllUsers().subscribe({
        next: data => {
          this.credentials = data;
          this.toastrService.success("Credenciais carregadas com sucesso!");
        },
        error: error => {
          this.toastrService.error("Não foi possível carregar credenciais!");
        },
        complete: () => {
          this.isCredentialsLoading = false;
        }
      });
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.maxLength(20), Validators.minLength(1)]],
      password: [null, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
    });
  }

  getErrorMessage(campo: string): string | undefined {
    const control = this.form.get(campo);

    if (!control || !control.errors) return undefined;

    if (control.hasError('required')) return 'Campo obrigatório.';

    if (control.hasError('maxlength')) {
      const erro = control.getError('maxlength');
      return `Máximo de ${erro.requiredLength} caracteres permitidos.`;
    }

    if (control.hasError('minlength')) {
      const erro = control.getError('minlength');
      return `Mínimo de ${erro.requiredLength} caracteres exigidos.`;
    }

    return undefined;
  }

  onLogin(): void {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: data => {
          this.router.navigate(['/home']);
          this.toastrService.success("Login realizado com sucesso!");
        },
        error: error => {
          this.errorMessage = 'Usuário ou senha inválidos. Por favor, tente novamente.';
          this.toastrService.error("Não foi possível realizar o Login!");
        }
      });
    }
  }

  openRegisterModal(): void {
    const modalRef: NgbModalRef = this.modalService.open(CreateUserModal, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
  }
}
