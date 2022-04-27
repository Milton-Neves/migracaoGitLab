import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-pagination-number',
  templateUrl: './pagination-number.component.html',
  styleUrls: ['./pagination-number.component.scss'],
})
export class PaginationNumberComponent implements OnInit {
  @Input() visibleItems?: number = 0
  @Input() totalItems?: number = 0
  constructor() {}

  ngOnInit(): void {}
}
