import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
})
export class InputSearchComponent implements OnInit {
  @Input() sizeWithSufix: string = '100%'

  constructor() {}

  ngOnInit(): void {}
}
