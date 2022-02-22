import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-analytic-card',
  templateUrl: './analytic-card.component.html',
  styleUrls: ['./analytic-card.component.scss'],
})
export class AnalyticCardComponent implements OnInit {
  @Input() data!: number
  @Input() title!: string

  constructor() {}

  ngOnInit(): void {}
}
