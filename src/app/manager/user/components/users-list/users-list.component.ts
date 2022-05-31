import { CitizenModalComponent } from './../citizen-modal/citizen-modal.component'
import { Component, OnInit } from '@angular/core'
import { NgxModalService } from 'lib/ngx-modal/src/lib/ngx-modal.service'
import { UserModalComponent } from '../user-modal/user-modal.component'
import { FeatureFlagService } from '@shared/services/feature-flag.service'
import { ToastrService } from 'ngx-toastr'
import { FeatureFlagProps } from '@core/interfaces/Feature-flag.model'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  sectionTitle = ['SEMAS', 'EMPRESAS', 'CIDADÃOS']
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
    console.log(this.featureFlag)

    this.checkPlaceholder()
    this.activeTab = this.sectionTitle[0]
  }
}
