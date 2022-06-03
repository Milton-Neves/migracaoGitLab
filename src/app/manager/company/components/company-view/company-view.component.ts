import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Company } from '../../entities/company.model'
import { CompanyService } from '../../services/company.service'
import { LegalUserService } from '../../services/legal-user.service'
import { CompanyRemovalConfirmationComponent } from './../company-removal-confirmation/company-removal-confirmation.component'

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.scss'],
})
export class CompanyViewComponent implements OnInit {
  @Input() id?: number
  @Input() isAcceptCompany: boolean = false
  texto = 'nome fantasia'
  company$!: Observable<Company>

  constructor(
    private modalService: NgxModalService,
    private router: Router,
    private companyService: CompanyService,
    private legalUserService: LegalUserService,
    private toastr: ToastrService
  ) {}

  closeModalCompanyView() {
    this.modalService.close()
  }
  openModalRemovalConfirmation() {
    this.modalService.open(CompanyRemovalConfirmationComponent).subscribe()
  }
  removeHourFromDate(completeDate: string) {
    return completeDate.split(' ')[0]
  }

  getCompany() {
    if (this.id == undefined) {
      this.closeModalCompanyView()
      return
    }
    this.company$ = this.companyService
      .findOne(`${this.id}`)
      .pipe(map((res) => res.data))
  }

  handleAcceptCompany(company: Company) {
    company.valid = true
    this.companyService.update(company).subscribe((res) => {
      this.toastr.success('Empresa aceita com sucesso!')
      this.closeModalCompanyView()
    })
  }

  handleDeleteCompany(companyId?: number) {
    this.legalUserService
      .delete(`delete_by_legal_person/${companyId}`)
      .subscribe((res) => {
        this.toastr.success(
          this.isAcceptCompany
            ? 'Empresa recusada com sucesso!'
            : 'Empresa deletada com sucesso!'
        )
        this.closeModalCompanyView()
      })
  }

  ngOnInit(): void {
    this.getCompany()
  }
}
