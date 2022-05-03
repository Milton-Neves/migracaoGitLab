import { NgxModalService } from './../../../../../lib/ngx-modal/src/lib/ngx-modal.service'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
  styleUrls: ['./reset-email.component.scss'],
})
export class ResetEmailComponent implements OnInit {
  form: any
  visibilityEmail = {
    email: true,
    confirmEmail: true,
  }
  isMatch: boolean = true
  emailValid: boolean = false
  changeEmailForm!: FormGroup
  constructor(private modalService: NgxModalService, private fb: FormBuilder) {}
  private buildFormEmail(): void {
    this.changeEmailForm = this.fb.group({
      newEmail: ['', Validators.required],
      confirmEmail: ['', [Validators.required]],
    })
  }
  closeModalEmail() {
    this.modalService.close()
  }

  get confirmEmail() {
    return this.changeEmailForm.controls.confirmPass
  }

  get em() {
    return this.changeEmailForm.controls.newPass
  }

  verifyEmail() {
    this.changeEmailForm.valueChanges
      .pipe(debounceTime(400))
      .subscribe((res) => {
        this.isMatch = false
        if (res.newEmail == res.confirmEmail) {
          this.isMatch = true
          this.emailValid = true
        }
      })
  }

  ngOnInit(): void {
    this.buildFormEmail()
  }
}
