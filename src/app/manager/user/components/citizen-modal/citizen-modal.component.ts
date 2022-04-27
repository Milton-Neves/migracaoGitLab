import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-citizen-modal',
  templateUrl: './citizen-modal.component.html',
  styleUrls: ['./citizen-modal.component.scss'],
})
export class CitizenModalComponent implements OnInit {
  sectionTitle = ['Alterar senha', 'Alterar e-mail']
  activeTab?: string
  modalService: any

  constructor() {}

  changeTab(tab: any) {
    this.activeTab = tab
    console.log(this.activeTab)
  }

  ngOnInit(): void {
    this.activeTab = this.sectionTitle[0]
  }
}
