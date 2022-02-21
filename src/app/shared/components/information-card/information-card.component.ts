import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-information-card',
  templateUrl: './information-card.component.html',
  styleUrls: ['./information-card.component.scss'],
})
export class InformationCardComponent implements OnInit {
  @Input() careerInformation!: string
  @Input() titleInformation!: string

  constructor() {}

  ngOnInit(): void {}
}
