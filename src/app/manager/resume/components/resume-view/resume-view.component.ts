import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.scss'],
})
export class ResumeViewComponent implements OnInit {
  sectionTitle = [
    'Dados',
    'Disponibilidade',
    'Formação',
    'Experiência Profissional',
  ]
  activeTab?: string

  constructor() {}

  changeTab(tab: any) {
    this.activeTab = tab
    console.log(this.activeTab)
  }

  ngOnInit(): void {
    this.activeTab = this.sectionTitle[0]
  }
}
