import { Component, OnInit } from '@angular/core'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form: any
  visibilityPassword = {
    password: true,
    confirmPassword: true,
  }
  changes: string | undefined
  changePasswordForm!: FormGroup

  constructor(private modalService: NgxModalService, private fb: FormBuilder) {}

  checkPasswords(group: FormGroup = this.changePasswordForm): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      control.value === group.controls.newPass.value || control.value == ''
        ? null
        : { notSame: 'Senhas não correspodem' }
  }

  set passwordValidator(formControl: AbstractControl) {
    formControl.setValidators([
      this.checkPasswords(),
      Validators.required,
      Validators.minLength(6),
    ])
  }
  private buildForm(): void {
    this.changePasswordForm = this.fb.group({
      newPass: ['', Validators.required],
      confirmPass: ['', [Validators.required]],
    })
  }

  closeModalPassword() {
    this.modalService.close()
  }
  get confirmPass(): AbstractControl | null {
    return this.changePasswordForm.controls.confirmPass
  }

  ngOnInit(): void {
    this.buildForm()
    this.passwordValidator = this.changePasswordForm.controls.confirmPass
    this.changePasswordForm.valueChanges.subscribe((res) =>
      console.log(!this.confirmPass!.errors!.notSame)
    )
    console.log(this.changePasswordForm.value)
  }
}

//   formularioDeLogin!: FormGroup

//   constructor(
//     private modalService: NgxModalService,
//     private formBuilder: FormBuilder
//   ) {}

//   ngOnInit() {
//     this.formularioDeLogin = this.formBuilder.group({
//       senha: ['', [Validators.required, Validators.minLength(6)]],
//       confirmarSenha: [
//         '',
//         Validators.required,
//         Validators.minLength(6),
//         this.validarSenhas,
//       ],
//     })
//   }

//   validarSenhas = (confirmarSenha: FormControl): Observable<FormControl> => {
//     // console.log(confirmarSenha.value) // imprimindo o valor da confirmação de senha
//     let verify = false
//     if (this.formularioDeLogin.get('senha')!.value == confirmarSenha.value) {
//       console.log('Senhas correspondem!')
//       verify = true
//       // console.log(this.formularioDeLogin.get('senha')!.value) // imprimindo o vlaor da senha
//     } else {
//       console.log('Senhas não são iguais!')
//       console.error()

//       verify = false
//     }
//     return this.validarSenhas(confirmarSenha)
//   }
//   // verificarSenhas() {
//   //   this.validarSenhas
//   //   if(runInThisContext.formularioDeLogin[0])

//   // }

//   acessar() {
//     console.log(this.formularioDeLogin.getRawValue())
//     console.log(this.formularioDeLogin.controls.senha.errors)
//   }
//   closeModalPassword() {
//     this.modalService.close()
//   }
// }
