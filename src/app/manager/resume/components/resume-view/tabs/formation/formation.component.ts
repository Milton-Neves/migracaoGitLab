import { Component, Input, OnInit } from '@angular/core'
import { Education } from '@core/interfaces/resume/education'

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss'],
})
export class FormationComponent implements OnInit {
  @Input() educations!: any[]

  constructor() {}

  ngOnInit(): void {}
}
