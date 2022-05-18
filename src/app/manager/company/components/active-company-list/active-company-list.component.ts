import { Component, OnInit } from '@angular/core'
import { ApiResponse } from '@core/interfaces/api-response.model'
import { Company } from '@core/interfaces/company'
import { Observable } from 'rxjs'
import { CompanyService } from '../../services/company.service'

@Component({
  selector: 'app-active-company-list',
  templateUrl: './active-company-list.component.html',
  styleUrls: ['./active-company-list.component.scss'],
})
export class ActiveCompanyListComponent implements OnInit {
  company: Company[] = []
  totalCompanys: number = 0
  companys$!: Observable<Company[]>

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.getCompanysList()
  }

  getCompanysList() {
    this.companyService
      .findAll()
      .subscribe((company: ApiResponse<Company[]>) => {
        this.company = company.data
      })
  }
}
