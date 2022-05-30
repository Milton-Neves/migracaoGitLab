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
  passwordPattern = `^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z$*&@#]{8,}$`
  isMatch: boolean = true
  isVisibleEyeNewPasswordInput: boolean = false
  isVisibleEyeConfirmPasswordInput: boolean = false
  changePasswordForm!: FormGroup

  constructor(private modalService: NgxModalService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.changePasswordForm = this.createForm()
  }

  closeModalPassword(): void {
    this.modalService.close()
  }

  verify(): void {
    this.changePasswordForm.valueChanges
      .pipe(debounceTime(400))
      .subscribe((res) => {
        this.isMatch = res.newPassPassword === res.confirmPassword
      })
  }

  toggleEyeNewPasswordInput() {
    this.isVisibleEyeNewPasswordInput = !this.isVisibleEyeNewPasswordInput
  }

  toggleEyeConfirmPasswordInput() {
    this.isVisibleEyeConfirmPasswordInput =
      !this.isVisibleEyeConfirmPasswordInput
  }

  get confirmPass() {
    return this.changePasswordForm.controls.confirmPassword
  }

  get newPassword() {
    return this.changePasswordForm.controls.newPassword
  }

  private createForm(): FormGroup {
    return this.fb.group({
      newPassword: [
        '',
        [Validators.required, Validators.pattern(this.passwordPattern)],
      ],
      confirmPassword: [
        '',
        [Validators.required, Validators.pattern(this.passwordPattern)],
      ],
    })
  }
}
