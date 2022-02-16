import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  pageAtual = 2
  numPaginas = 14

  constructor() {}

  ngOnInit() {}

  getNumberPage() {
    if (this.pageAtual > 0 && this.pageAtual < 10) {
      return '0' + this.pageAtual
    }
    return this.pageAtual
  }
}
