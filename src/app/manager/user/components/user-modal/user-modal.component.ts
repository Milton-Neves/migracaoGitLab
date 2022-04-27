import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
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
