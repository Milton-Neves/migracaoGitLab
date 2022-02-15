import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  pageAtual = 2
  numPaginas = 5

  constructor() {}

  ngOnInit() {}
}
