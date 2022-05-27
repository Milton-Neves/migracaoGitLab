import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() pagination$?: Observable<any>
  // @Input() companys$?: Observable<any>
  @Output() currentPageEmit = new EventEmitter<number>()

  constructor() {}

  ngOnInit() {}

  setCurrentPage(currentPage: number) {
    this.currentPageEmit.emit(currentPage)
  }

  getNumberPage(currentPage: number) {
    if (currentPage > 0 && currentPage < 10) {
      return '0' + currentPage
    }
    return currentPage
  }
}
