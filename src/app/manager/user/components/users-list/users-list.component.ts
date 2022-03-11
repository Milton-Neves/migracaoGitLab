import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  sectionTitle = ['SEMAS', 'EMPRESAS', 'CIDADÃOS']
  activeTab?: string

  constructor() {}

  changeTab(tab: any) {
    this.activeTab = tab
    console.log(this.activeTab)
  }
  ngOnInit(): void {}
}
