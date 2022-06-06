import { Component, OnInit } from '@angular/core'
import { ApiResponse } from '@core/interfaces/api-response.model'
import { Company } from '@core/interfaces/company'
import { PaginationService } from '@shared/services/pagination.service'
import { Observable, of } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { CompanyService } from '../../services/company.service'

@Component({
  selector: 'app-active-company-list',
  templateUrl: './active-company-list.component.html',
  styleUrls: ['./active-company-list.component.scss'],
})
export class ActiveCompanyListComponent implements OnInit {
  totalCompanys: number = 0
  companys$!: Observable<Company[]>
  companies: any[] = []
  companies$!: Observable<Company[]>

  constructor(
    private companyService: CompanyService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.getCompanysList()
    this.getCompanyFromServer()
  }

  getCompanysList() {
    this.companies$ = this.companyService
      .findAll() // ApiResponse<Company[]> // {data: Company[], mensagem: "", status: 200 }
      .pipe(
        map((res: any) => {
          // return []
          console.log(res)
          this.companies = res.data?.content
          // console.log(res.data?.content)
          return res.data?.content
          // return res.data?.pagination
        })
      )
    // .subscribe()
  }

  getCompanyFromServer(page: number = 1, params?: any) {
    this.companyService
      .findAll('', { statusCompany: true })
      .pipe(
        tap((company) => {
          this.totalCompanys = company.data.length
          this.paginateCompanys(page, company.data)
          // this.paginateCompanys(page, [])
        }),
        map((res) => res.data)
      )
      .subscribe()
  }

  paginateCompanys(page: number, companies: any[]) {
    let { results, pagination } = this.paginationService.createPagination(
      page,
      companies,
      this.paginationService.verifyPageSize()
    )

    this.companies = results
    this.companys$ = of(pagination)
  }
}
