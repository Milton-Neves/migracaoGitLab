import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit {
  tabs = ['Ativos', 'Arquivados']
  activeTab?: string

  constructor() {}

  ngOnInit(): void {}

  changeTab(tab: any) {
    this.activeTab = tab
  }
}
