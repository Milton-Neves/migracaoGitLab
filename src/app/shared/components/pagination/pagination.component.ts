import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  pageAtual = 9;
  numPaginas = 14;

  constructor() { }

  ngOnInit() {
  }

  getNumberPage() {
    if (this.pageAtual > 0 && this.pageAtual < 10) {
      let addZero = this.pageAtual + "";
      addZero = "0" + addZero;
      return addZero;
    }
    else {
      return this.pageAtual
    }
  }
}
