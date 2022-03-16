import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
})
export class InputSearchComponent implements OnInit {
  @Input() styles!: any
  @Input() align!: any
  @Input() placeholder!: string

  constructor() {}

  ngOnInit(): void {}
}
