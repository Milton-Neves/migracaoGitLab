import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit {
  tabs = ['Ativos', 'Arquivados']
  paramGeneralInfo!: string
  activeTab?: string

  constructor() {}

  ngOnInit(): void {}

  setGeneralInfo(event: any) {
    this.paramGeneralInfo = event
  }

  changeTab(tab: any) {
    this.activeTab = tab
  }
}
