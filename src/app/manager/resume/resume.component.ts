import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit {
  currentTab!: string

  constructor() {}

  ngOnInit(): void {}

  changeCurrentTab(tabNav: string) {
    this.currentTab = tabNav
    console.log(this.currentTab)
  }
}
