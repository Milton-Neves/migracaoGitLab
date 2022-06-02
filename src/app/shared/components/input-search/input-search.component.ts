import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
})
export class InputSearchComponent implements OnInit {
  @Input() styles!: any
  @Input() align!: any
  @Input() placeholder!: string
  @Output() onSearch = new EventEmitter<string>()
  constructor() {}

  ngOnInit(): void {}

  changeValue(value: string) {
    this.onSearch.emit(value)
  }
}
