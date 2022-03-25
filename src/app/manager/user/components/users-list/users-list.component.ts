import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  sectionTitle = ['SEMAS', 'EMPRESAS', 'CIDADÃOS']
  activeTab?: string
  placeholderActiveSection!: string
  constructor() {}

  changeTab(tab: any) {
    this.activeTab = tab
    this.checkPlaceholder()
  }

  checkPlaceholder() {
    setTimeout(() => {
      this.activeTab == this.sectionTitle[0]
        ? (this.placeholderActiveSection =
            'Buscar por nome, matrícula, e-mail, CPF ou CNPJ')
        : this.activeTab == this.sectionTitle[1]
        ? (this.placeholderActiveSection = 'Buscar por nome ou CNPJ')
        : (this.placeholderActiveSection = 'Buscar por nome ou CPF')
    }, 100)
  }

  ngOnInit(): void {
    this.checkPlaceholder()
  }
}
