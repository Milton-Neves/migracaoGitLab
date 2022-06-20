import { Component, OnInit } from '@angular/core'
import { FeatureFlagService } from '@shared/services/feature-flag.service'
import { NgxModalService } from 'lib/ngx-modal/src/lib/ngx-modal.service'
import { ToastrService } from 'ngx-toastr'

import { UserModalComponent } from '../user-modal/user-modal.component'
import { CitizenModalComponent } from './../citizen-modal/citizen-modal.component'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  tableColumns = ['Nome', 'CPF', 'Ações']
  sectionTitle = ['MINHA CONTA', 'EMPRESAS', 'CIDADÃOS']
  activeTab?: string
  placeholderActiveSection!: string
  featureFlag: { legalUser: boolean; physicalUser: boolean } = {
    legalUser: this.featureFlagService.featureFlagConfig!['legalUser'],
    physicalUser: this.featureFlagService.featureFlagConfig!['physicalUser'],
  }

  constructor(
    private modalService: NgxModalService,
    private featureFlagService: FeatureFlagService,
    private toastr: ToastrService
  ) {}

  changeTab(tab: any) {
    this.activeTab = tab
    this.checkPlaceholder()
  }

  checkPlaceholder() {
    this.setColumns()
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

  setColumns() {
    this.activeTab == this.sectionTitle[0]
      ? (this.tableColumns = ['Nome', 'Matrícula', 'Ações'])
      : this.activeTab == this.sectionTitle[1]
      ? (this.tableColumns = ['Nome', 'CNPJ', 'Ações'])
      : (this.tableColumns = ['Nome', 'CPF', 'Ações'])
  }

  ngOnInit(): void {
    this.checkPlaceholder()
    this.activeTab = this.sectionTitle[0]
  }
}
