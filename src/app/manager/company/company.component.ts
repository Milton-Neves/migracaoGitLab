import { HttpClient } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { CompanyEditComponent } from './components/company-edit/company-edit.component'
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit, OnDestroy {
  isNavActive: boolean = true
  router: any
  changeNav(value: boolean) {
    this.isNavActive = value
  }

  constructor(
    private modalService: NgxModalService,
    private http: HttpClient
  ) {}

  openModal() {
    let modal = this.modalService.open(CompanyEditComponent).subscribe()
  }

  ngOnInit(): void {
    this.verifyWidthPage()
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
