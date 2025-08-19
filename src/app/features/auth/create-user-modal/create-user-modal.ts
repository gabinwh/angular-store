import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../core/services/user-service';

@Component({
  selector: 'app-create-user-modal',
  standalone: false,
  templateUrl: './create-user-modal.html',
  styleUrl: './create-user-modal.scss'
})
export class CreateUserModal {
  constructor(
    protected activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService
  ) { }

  form!: FormGroup;

  ngOnInit() {

    this.initForm();
    this.form.markAllAsTouched();
  }

  private initForm(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.maxLength(20), Validators.minLength(1)]],
      password: [null, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      email: [null, [Validators.email, Validators.required, Validators.maxLength(150), Validators.minLength(3)]]
    });
  }

  getErrorMessage(campo: string): string | undefined {
    const control = this.form.get(campo);

    if (!control || !control.errors) return undefined;

    if (control.hasError('required')) return 'Campo obrigatório.';

    if (control.hasError('email')) return 'Email inválido.';

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

  defineToolTipBtnSave(): string | null {
    return !this.form.valid ? "O formulário está inválido." : null;
  }

  onRegister(): void {
    if (this.form.valid) {
      this.userService.createUser(this.form.value).subscribe({
        next: (userResponse) => {
          this.toastrService.success('Conta criada com sucesso!', 'Sucesso!');
          this.activeModal.close(); 
        },
        error: (error) => {
          this.toastrService.error('Ocorreu um erro ao criar a conta.', "Erro");
        }
      });
    }
  }
}
