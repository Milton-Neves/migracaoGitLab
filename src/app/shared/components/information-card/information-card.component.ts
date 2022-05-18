import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-information-card',
  templateUrl: './information-card.component.html',
  styleUrls: ['./information-card.component.scss'],
})
export class InformationCardComponent {
  @Input() title?: string
  @Input() career?: string
  @Input() stylesInformation!: string
  @Input() stylesHeader!: string

  constructor() {}

  ngOnInit(): void {}
}
