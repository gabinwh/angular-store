import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss'
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  form!: FormGroup;
  errorMessage: string | null = null;

  ngOnInit() {

    this.initForm();
    this.form.markAllAsTouched();
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
          console.log('Login bem-sucedido!', data);
          this.router.navigate(['/home']);
        },
        error: error => {
          console.error('Login falhou:', error);
          this.errorMessage = 'Usuário ou senha inválidos. Por favor, tente novamente.';
        }
      });
    }
  }
}
