import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LoginService } from 'app/login/services/login.service'
import { ToastrService } from 'ngx-toastr'
import { debounceTime, tap } from 'rxjs/operators'
import { UserSemasService } from '../../services/user-semas.service'

@Component({
  selector: 'app-reset-account-password',
  templateUrl: './reset-account-password.component.html',
  styleUrls: ['./reset-account-password.component.scss'],
})
export class ResetAccountPasswordComponent implements OnInit {
  @Input() currentUser!: any
  userInformation = this.loginService.authenticatedUser.value
  viewCurrentPassword: boolean = false
  viewNewPassword: boolean = false
  viewConfirmationNewPassword: boolean = false
  changePasswordForm!: FormGroup

  constructor(
    private loginService: LoginService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private userSemasService: UserSemasService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.createForm()
  }

  //Metodo apenas para usuarios admins
  changePassword() {
    this.userSemasService
      .update(
        {
          ...this.changePasswordForm.value,
        },
        'change_password'
      )
      .pipe(
        tap((res) => {
          this.toastr.success(res.message)
          this.changePasswordForm.reset()
        })
      )
      .subscribe()
  }

  verifyIfPasswordMatchs(): void {
    this.changePasswordForm.valueChanges
      .pipe(debounceTime(400))
      .subscribe((res) => {
        if (
          res.newPassword !== res.confirmNewPassword &&
          res.confirmNewPassword != ''
        ) {
          let confirmPassword =
            this.changePasswordForm.controls.confirmNewPassword
          confirmPassword.markAsTouched()
          confirmPassword.setErrors({
            notSame: 'Senhas não correspodem',
          })
        }
      })
  }

  private createForm(): FormGroup {
    return this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=(?:.*[a-zA-Z]){2,})(?=(?:.*\d){1,})(?=(?:.*[\'\"\-!@_?(\[\]{}<^>~`.´°ºª£=¢¬¹²³§)/|;:¨#,$%^&*+]){1})(?=(?!.*\s)).{6,}$/
          ),
        ],
      ],
      confirmNewPassword: ['', [Validators.required]],
    })
  }
}

//Validação do form e lembrar de aplicar permssions de acordo com o usuario...
