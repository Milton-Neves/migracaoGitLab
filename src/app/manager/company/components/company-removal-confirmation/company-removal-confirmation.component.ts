import { Component, Input, OnInit } from '@angular/core'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { ToastrService } from 'ngx-toastr'

import { LegalUserService } from '../../services/legal-user.service'

@Component({
  selector: 'app-company-removal-confirmation',
  templateUrl: './company-removal-confirmation.component.html',
  styleUrls: ['./company-removal-confirmation.component.scss'],
})
export class CompanyRemovalConfirmationComponent implements OnInit {
  @Input() legalPersonId!: number
  @Input() isAcceptCompany?: boolean
  modalClosedBySystem: boolean = false
  constructor(
    private legalUserService: LegalUserService,
    private modalService: NgxModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  deleteCompany() {
    this.legalUserService
      .delete(`delete_by_legal_person/${this.legalPersonId}`)
      .subscribe((res) => {
        this.toastr.success(
          this.isAcceptCompany
            ? 'Empresa recusada com sucesso!'
            : 'Empresa deletada com sucesso!',
          'Sucesso!',
          { timeOut: 7000 }
        )
        this.modalClosedBySystem = true
        this.closeModal()
      })
  }

  closeModal() {
    this.modalService.close()
  }
}
