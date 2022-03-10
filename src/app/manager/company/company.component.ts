import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  constructor() {}

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
}
