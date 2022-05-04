import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-professional-experience',
  templateUrl: './professional-experience.component.html',
  styleUrls: ['./professional-experience.component.scss'],
})
export class ProfessionalExperienceComponent implements OnInit {
  @Input() workExperiences!: any

  constructor() {}

  ngOnInit(): void {}
}
