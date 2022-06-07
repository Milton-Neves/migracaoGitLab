import { Component, Input, OnInit } from '@angular/core'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

import { Company } from '../../entities/company.model'
import { CompanyService } from '../../services/company.service'
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
    private companyService: CompanyService,
    private toastr: ToastrService
  ) {}

  closeModalCompanyView() {
    this.modalService.close()
  }
  openModalRemovalConfirmation() {
    this.modalService
      .open(CompanyRemovalConfirmationComponent, {
        isAcceptCompany: this.isAcceptCompany,
        legalPersonId: this.id,
      })
      .pipe(switchMap((modal) => modal.onClose))
      .subscribe((res) => {
        if (res.modalClosedBySystem) {
          setTimeout(() => {
            this.closeModalCompanyView()
          }, 100)
        }
      })
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
      this.toastr.success('Empresa aceita com sucesso!', 'Sucesso!')
      this.closeModalCompanyView()
    })
  }

  ngOnInit(): void {
    this.getCompany()
  }
}
