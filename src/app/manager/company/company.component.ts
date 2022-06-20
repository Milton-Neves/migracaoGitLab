import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Observable, of, Subscription } from 'rxjs'
import { tap } from 'rxjs/operators'

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

  constructor(private companyService: CompanyService, private router: Router) {}

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
          this.companies = content.map(this.formatCreatedAtCompanyAttribute)

          this.totalCompanies = pagination.totalNumberOfElements
          this.visibleItems = pagination.offset + pagination.numberOfElements

          this.pagination$ = of({
            current: page + 1,
            next: pagination.lastPage ? undefined : page + 1,
            previous: pagination.firstPage ? undefined : page - 1,
          })
        })
      )
      .subscribe()
  }

  openCompanyRegistration() {
    this.router.navigate(['/gerenciador/empresas/cadastrar'])
  }

  changeNav(value: boolean) {
    this.isNavActive = value
    this.getCompanies()
  }

  private formatCreatedAtCompanyAttribute(company: any) {
    const dateTime = company.createdAt.split(' ')
    const date = dateTime[0]
    const createdAt =
      dateTime.length >= 2 ? date.split('/').reverse().join('-') : date

    return {
      ...company,
      createdAt,
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }
}
