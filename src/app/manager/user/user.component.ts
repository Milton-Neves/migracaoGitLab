import { Component, OnInit } from '@angular/core'

import { Observable } from 'rxjs/internal/Observable'
import { NgxModalService } from 'lib/ngx-modal/src/lib/ngx-modal.service'

import { FeatureFlagService } from '@shared/services/feature-flag.service'
import { UserModalComponent } from './components/user-modal/user-modal.component'
import { CitizenModalComponent } from './components/citizen-modal/citizen-modal.component'
import { LoginService } from 'app/login/services/login.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  sectionTitle = ['SEMAS', 'EMPRESAS', 'CIDADÃOS']
  role: string | null = null
  activeTab?: string
  currentPage!: number
  totalCountLegalUsers: number = 0
  placeholderActiveSection!: string
  pagination$!: Observable<any>

  featureFlag = {
    legalUser: this.featureFlagService.featureFlagConfig!['legalUser'],
    physicalUser: this.featureFlagService.featureFlagConfig!['physicalUser'],
  }

  constructor(
    private modalService: NgxModalService,
    private featureFlagService: FeatureFlagService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.activeTab = this.sectionTitle[0]
    this.role = this.loginService.getRole()
  }

  ngAfterContentChecked(): void {
    this.checkPlaceholder()
  }

  changeTab(tab: any) {
    this.activeTab = tab
    this.checkPlaceholder()
  }

  checkPlaceholder() {
    if (this.activeTab == this.sectionTitle[0]) {
      this.placeholderActiveSection =
        'Buscar por nome, matrícula, e-mail, CPF ou CNPJ'
    } else if (this.activeTab == this.sectionTitle[1]) {
      this.placeholderActiveSection = 'Pesquise por nome ou CNPJ'
    } else {
      this.placeholderActiveSection = 'Pesquise por nome ou CPF'
    }
  }

  getNumberPage() {
    return this.currentPage > 0 && this.currentPage < 10
      ? `0${this.currentPage}`
      : this.currentPage
  }

  openUserModal() {
    let modal = this.modalService.open(UserModalComponent).subscribe()
  }

  openCitizenModal() {
    let modal = this.modalService.open(CitizenModalComponent).subscribe()
  }
}
