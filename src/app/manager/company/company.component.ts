import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { PaginationService } from '@shared/services/pagination.service'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { Observable, of } from 'rxjs'
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
  totalCompanys: number = 0
  pagination$!: Observable<any>
  isNavActive: boolean = true
  changeNav(value: boolean) {
    this.isNavActive = value
    this.getCompaniesFromServer()
  }

  constructor(
    private modalService: NgxModalService,
    private companyService: CompanyService,
    private paginationService: PaginationService,
    private router: Router
  ) {}

  getCompaniesFromServer(page: number = 1, params?: any) {
    this.companyService
      .findAll('', {
        valid: this.isNavActive,
      })
      .pipe(
        map((res) => res.data),
        tap((res: any) => {
          this.paginateCompanies(page, res.content)
          this.totalCompanys = res.pagination.totalNumberOfElements
        }),
        map((res: any) => res.content)
      )
      .subscribe()
  }

  paginateCompanies(page: number, companies: Company[]) {
    let { results, pagination } = this.paginationService.createPagination(
      page,
      companies,
      this.paginationService.verifyPageSize()
    )
    this.companies = results
    this.pagination$ = of(pagination)
  }

  openModal() {
    let modal = this.modalService.open(CompanyEditComponent).subscribe()
  }

  openCompanyRegistration() {
    this.router.navigate(['/gerenciador/empresas/cadastrar'])
  }

  ngOnInit(): void {
    this.verifyWidthPage()
    this.getCompaniesFromServer()
    document.addEventListener('click', (el: any) => {
      this.verifyWidthPage()
    })
  }

  findWidthPage() {
    let element = document.getElementById('content')
    return element!.getBoundingClientRect().width
  }

  verifyWidthPage() {
    if (this.findWidthPage() > 900) {
      let btnElements = document.getElementById('btns')
      btnElements!.style.flexGrow = '1'
    }
  }

  ngOnDestroy(): void {
    document.removeAllListeners!('click')
  }
}
