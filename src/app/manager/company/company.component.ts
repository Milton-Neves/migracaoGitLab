import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { Observable, of, Subscription } from 'rxjs'
import { map, tap } from 'rxjs/operators'

import { CompanyEditComponent } from './components/company-edit/company-edit.component'
import { Company } from './entities/company.model'
import { CompanyService } from './services/company.service'

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit, OnDestroy {
  tableColumns = ['Nome Fantasia', 'CNPJ', 'Data de Solicitação', 'Ações']
  companies: Company[] = []
  isNavActive: boolean = true
  totalCompanies: number = 0
  pagination$!: Observable<any>
  visibleItems = 0

  subscription$ = new Subscription()

  constructor(
    private modalService: NgxModalService,
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription$ = this.getCompanies()
  }

  getCompanies(page: number = 0, params?: any) {
    return this.companyService
      .findAll('', {
        valid: this.isNavActive,
        size: 8,
        page,
      })
      .pipe(
        tap(({ data }: any) => {
          const { content, pagination } = data
          this.companies = content
          this.totalCompanies = pagination.totalNumberOfElements
          this.visibleItems = this.getTotalVisibleItems(pagination)

          this.pagination$ = of({
            current: page + 1,
            next: pagination.lastPage ? undefined : page + 1,
            previous: pagination.firstPage ? undefined : page - 1,
          })
        })
      )
      .subscribe()
  }

  private getTotalVisibleItems(pagination: any) {
    if (pagination.numberOfPages === 1) {
      return pagination.numberOfElements
    }

    return (
      (pagination.numberOfPages - 1) * pagination.size * pagination.page -
      (pagination.size - pagination.numberOfElements)
    )
  }

  openModal() {
    let modal = this.modalService.open(CompanyEditComponent).subscribe()
  }

  openCompanyRegistration() {
    this.router.navigate(['/gerenciador/empresas/cadastrar'])
  }

  changeNav(value: boolean) {
    this.isNavActive = value
    this.getCompanies()
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }
}
