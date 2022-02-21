import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-pagination-number',
  templateUrl: './pagination-number.component.html',
  styleUrls: ['./pagination-number.component.scss'],
})
export class PaginationNumberComponent implements OnInit {
  @Input() visibleItems!: number
  @Input() totalItems!: number
  constructor() {}

  ngOnInit(): void {}
}
