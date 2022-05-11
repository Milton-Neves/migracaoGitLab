import { Component, OnInit } from '@angular/core'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-reset-password-user',
  templateUrl: './reset-password-user.component.html',
  styleUrls: ['./reset-password-user.component.scss'],
})
export class ResetPasswordUserComponent implements OnInit {
  form: any
  visibilityPassword = {
    password: true,
    confirmPassword: true,
  }
  isMatch: boolean = true
  changePasswordForm!: FormGroup
  pwdPattern = `(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*()_+^&}{:;?.])(?:([0-9a-zA-Z!@#$%;*(){}_+^&])){6,}`
  buttonState: boolean = false
  activeButton: boolean = false

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
        this.isMatch = false
        if (res.newPass == res.confirmPass) {
          this.isMatch = true
        }
      })
  }
  toggle() {
    this.buttonState = this.buttonState ? false : true
  }
  toggleTwo() {
    this.activeButton = this.activeButton ? false : true
  }

  ngOnInit(): void {
    this.buildForm()
    this.pass.valueChanges.subscribe((res) => {
      console.log(this.pass)
    })
  }
}