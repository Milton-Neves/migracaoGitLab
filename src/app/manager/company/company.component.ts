import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { Observable } from 'rxjs'
import { CompanyEditComponent } from './components/company-edit/company-edit.component'
import { CompanyProps } from './entities/company.model'
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit, OnDestroy {
  company: CompanyProps[] = []
  totalCompanys: number = 0
  companys$!: Observable<CompanyProps[]>
  isNavActive: boolean = true
  changeNav(value: boolean) {
    this.isNavActive = value
  }

  constructor(
    private modalService: NgxModalService,
    private http: HttpClient,
    private router: Router
  ) {}
  listar_dados() {
    this.companys$ = this.http.get<CompanyProps[]>(
      '../../../assets/mock/company.json'
    )
  }

  openModal() {
    let modal = this.modalService.open(CompanyEditComponent).subscribe()
  }

  openCompanyRegistration() {
    this.router.navigate(['/gerenciador/empresas/cadastrar'])
  }

  ngOnInit(): void {
    this.verifyWidthPage()
    this.listar_dados()
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
