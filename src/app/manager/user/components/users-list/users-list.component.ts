import { CitizenModalComponent } from './../citizen-modal/citizen-modal.component'
import { Component, OnInit } from '@angular/core'
import { NgxModalService } from 'lib/ngx-modal/src/lib/ngx-modal.service'
import { UserModalComponent } from '../user-modal/user-modal.component'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  sectionTitle = ['SEMAS', 'EMPRESAS', 'CIDADÃOS']
  activeTab?: string
  placeholderActiveSection!: string

  constructor(private modalService: NgxModalService) {}

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
  openUserModal() {
    let modal = this.modalService.open(UserModalComponent).subscribe()
  }
  openCitizenModal() {
    let modal = this.modalService.open(CitizenModalComponent).subscribe()
  }

  ngOnInit(): void {
    this.checkPlaceholder()
    this.activeTab = this.sectionTitle[0]
  }
}
