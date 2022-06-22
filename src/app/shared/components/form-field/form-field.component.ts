import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core'
import { FormControl, FormControlName } from '@angular/forms'

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent implements OnChanges {
  @ContentChild(FormControlName) formControl!: FormControl
  @Input() passwordError?: string
  @Input() id!: string
  currentError: string = ''

  private readonly ERRORS: { [description: string]: string } = {
    required: 'Campo obrigatório',
    mask: 'Formato Inválido',
    minlength: 'Quantidade de caracteres inválida',
    maxlength: 'Quantidade máxima de caracteres atingida',
    email: 'E-mail Inválido',
    notSame: 'Senhas não correspondem',
    pattern: 'Padrão de senha inválido',
    login: 'Já existe um usuário com este login',
    cpfNotValid: 'Digite um CPF válido',
  }

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.onFocusOut()
  }

  onFocusOut() {
    const errorMessage = document.getElementById(`${this.id}`)

    if (errorMessage) {
      errorMessage.innerHTML = ''
    }

    if (this.formControl?.errors)
      Object.keys(this.ERRORS).forEach((error: string) => {
        if (Object.keys(this.formControl.errors!).includes(error)) {
          errorMessage!.innerHTML =
            errorMessage!.innerHTML == ''
              ? this.ERRORS[error]
              : errorMessage!.innerHTML.concat(` | ${this.ERRORS[error]} `)
        }
      })
  }
}
