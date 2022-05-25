import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-reset-password-user',
  templateUrl: './reset-password-user.component.html',
  styleUrls: ['./reset-password-user.component.scss'],
})
export class ResetPasswordUserComponent implements OnInit {
  isMatch: boolean = true
  isVisibleEyeNewPasswordInput: boolean = false
  isVisibleEyeConfirmPasswordInput: boolean = false
  passwordPattern: string = `(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*()_+^&}{:;?.])(?:([0-9a-zA-Z!@#$%;*(){}_+^&])){6,}`
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
