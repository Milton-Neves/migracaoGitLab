import { Component, Input, OnInit } from '@angular/core'
import { LegalUserService } from 'app/manager/company/services/legal-user.service'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
  @Input() userId?: number
  legalUser$?: Observable<any>
  sectionTitle = ['Alterar senha', 'Alterar e-mail']
  activeTab?: string
  passwordWasReseted: boolean = false

  constructor(
    private legalUserService: LegalUserService,
    private ModalService: NgxModalService,
    private toastr: ToastrService
  ) {}

  changeTab(tab: any) {
    this.activeTab = tab
  }

  getUser() {
    if (this.userId == undefined) {
      this.closeModal()
    }
    this.legalUser$ = this.legalUserService
      .findOne(this.userId?.toString())
      .pipe(
        map((res: any) => res.data),
        tap((res) => console.log(res))
      )
  }

  changeEmail(legalUser: any, newEmail: string) {
    this.legalUserService
      .update({ ...legalUser, login: newEmail })
      .subscribe((res) => {
        this.toastr.success(res.message, 'Sucesso')
      })
  }

  resetPassword(id: number) {
    this.legalUserService.resetPassword(id).subscribe((res: any) => {
      this.toastr.success(res.message, 'Sucesso')
      this.passwordWasReseted = true
    })
  }

  closeModal() {
    this.ModalService.close()
  }

  ngOnInit(): void {
    this.activeTab = this.sectionTitle[0]
    this.getUser()
  }
}
