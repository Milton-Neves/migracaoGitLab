import { Component, OnInit } from '@angular/core'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { debounceTime } from 'rxjs/operators'

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
  isMatch: boolean = true
  changePasswordForm!: FormGroup
  pwdPattern = `^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z$*&@#]{8,}$`
  buttonState: boolean = false
  constructor(private modalService: NgxModalService, private fb: FormBuilder) {}

  private buildForm(): void {
    this.changePasswordForm = this.fb.group({
      newPass: ['', [Validators.required, Validators.pattern(this.pwdPattern)]],
      confirmPass: [
        '',
        [Validators.required, Validators.pattern(this.pwdPattern)],
      ],
    })
  }

  closeModalPassword() {
    this.modalService.close()
  }
  get confirmPass() {
    return this.changePasswordForm.controls.confirmPass
  }

  get pass() {
    return this.changePasswordForm.controls.newPass
  }

  verify() {
    this.changePasswordForm.valueChanges
      .pipe(debounceTime(400))
      .subscribe((res) => {
        console.log(res)
        this.isMatch = false
        if (res.newPass == res.confirmPass) {
          this.isMatch = true
        }
      })
  }
  toggle() {
    this.buttonState = this.buttonState ? false : true
    console.log(this.buttonState)
  }

  ngOnInit(): void {
    this.buildForm()
  }
}
