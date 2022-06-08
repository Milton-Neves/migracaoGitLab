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
  @Input() readonly: boolean = false
  @Output() onSearch = new EventEmitter<string>()
  @Input() value: any = ''
  constructor() {}

  ngOnInit(): void {}

  changeValue(value: string) {
    this.onSearch.emit(value)
  }
}
