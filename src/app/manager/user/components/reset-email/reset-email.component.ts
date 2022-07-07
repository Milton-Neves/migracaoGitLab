import { NgxModalService } from './../../../../../lib/ngx-modal/src/lib/ngx-modal.service'
import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { debounceTime } from 'rxjs/operators'
import { LegalUserService } from 'app/manager/company/services/legal-user.service'

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
  styleUrls: ['./reset-email.component.scss'],
})
export class ResetEmailComponent implements OnInit {
  @Output() formNewEmail = new EventEmitter<string>()
  isMatch: boolean = true
  changeEmailForm!: FormGroup

  constructor(private modalService: NgxModalService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.changeEmailForm = this.createForm()
  }

  get newEmail() {
    return this.changeEmailForm.controls.newEmail
  }

  closeModalEmail(): void {
    this.modalService.close()
  }

  verifyEmail() {
    this.changeEmailForm.valueChanges
      .pipe(debounceTime(400))
      .subscribe((res) => {
        this.isMatch = res.newEmail == res.confirmEmail
      })
  }

  changeEmail() {
    this.formNewEmail.emit(this.newEmail.value)
    this.changeEmailForm.reset()
  }

  private createForm(): FormGroup {
    return this.fb.group({
      newEmail: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
    })
  }
}
