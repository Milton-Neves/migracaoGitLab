import { Component, OnInit } from '@angular/core'
import { ApiResponse } from '@core/interfaces/api-response.model'
import { Company } from '@core/interfaces/company'
import { InformationCard } from '@core/interfaces/information-card'
import { Observable } from 'rxjs'
import { CompanyService } from '../../services/company.service'

@Component({
  selector: 'app-active-company-list',
  templateUrl: './active-company-list.component.html',
  styleUrls: ['./active-company-list.component.scss'],
})
export class ActiveCompanyListComponent implements OnInit {
  totalCompanys: number = 0
  companys$!: Observable<Company[]>
  companies!: any[]
  // = [
  //   {
  //     name: 'name',
  //     cnpj: 'cnpj',
  //     companyName: 'companyName',
  //     amountEmployees: 'amountEmployees',
  //     valid: 'valid'
  //   },
  // ]

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.getCompanysList()
  }

  getCompanysList() {
    this.companyService
      .findAll()
      .subscribe((company: ApiResponse<Company[]>) => {
        this.companies = company.data
        console.log(company.data)
      })
  }
}
