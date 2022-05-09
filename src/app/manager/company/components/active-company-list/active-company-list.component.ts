import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { CompanyProps } from '../../entities/company.model'
import { CompanyService } from '../../services/company.service'

@Component({
  selector: 'app-active-company-list',
  templateUrl: './active-company-list.component.html',
  styleUrls: ['./active-company-list.component.scss'],
})
export class ActiveCompanyListComponent implements OnInit {
  company: CompanyProps[] = []
  totalCompanys: number = 0
  companys$!: Observable<CompanyProps[]>

  constructor(private companyService: CompanyService) {}

  getCompanysList() {
    this.getCompanyService.getCompanysList().subscribe(
      (company) => (this.company = company),
      (error) => console.log('deu errado')
    )
  }

  ngOnInit(): void {}
}
