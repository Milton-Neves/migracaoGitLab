import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() pagination$?: Observable<any>
  @Output() currentPageEmit = new EventEmitter<number>()

  constructor() {}

  ngOnInit() {}

  setCurrentPage(currentPage: number) {
    this.currentPageEmit.emit(currentPage)
  }

  getNumberPage(currentPage: number) {
    return currentPage > 0 && currentPage < 10 ? `0${currentPage}` : currentPage
  }
}
