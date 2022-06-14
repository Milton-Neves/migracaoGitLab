import { LegalUserService } from './../../../company/services/legal-user.service'
import { Component, OnInit } from '@angular/core'
import { FeatureFlagService } from '@shared/services/feature-flag.service'
import { NgxModalService } from 'lib/ngx-modal/src/lib/ngx-modal.service'
import { ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs/internal/Observable'

import { UserModalComponent } from '../user-modal/user-modal.component'
import { CitizenModalComponent } from './../citizen-modal/citizen-modal.component'
import { PaginationService } from '@shared/services/pagination.service'
import { User } from 'app/login/interfaces/user'
import { of } from 'rxjs'
import { map, tap } from 'rxjs/operators'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  tableColumns = ['Nome', 'CNPJ', 'Ações']
  sectionTitle = ['SEMAS', 'EMPRESAS', 'CIDADÃOS']
  users: User[] = []
  data: any
  activeTab?: string
  currentPage!: number
  totalCountUsers: number = 0
  placeholderActiveSection!: string
  pagination$!: Observable<any>
  featureFlag: { legalUser: boolean; physicalUser: boolean } = {
    legalUser: this.featureFlagService.featureFlagConfig!['legalUser'],
    physicalUser: this.featureFlagService.featureFlagConfig!['physicalUser'],
  }
  pageAtual = 1
  numPaginas = 14

  constructor(
    private modalService: NgxModalService,
    private featureFlagService: FeatureFlagService,
    private toastr: ToastrService,
    private legalUserService: LegalUserService,
    private paginationService: PaginationService
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
  getNumberPage() {
    if (this.pageAtual > 0 && this.pageAtual < 10) {
      return '0' + this.pageAtual
    }
    return this.pageAtual
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

  getUsersFromServer(page: number = 1, params?: any) {
    this.legalUserService
      .findAll('', { statusResume: false })
      .pipe(
        tap(({ data }) => {
          this.currentPage = page
          this.totalCountUsers = data.length
          this.paginateUsers(page, data)
        }),
        map(({ data }) => data)
      )
      .subscribe()
  }
  paginateUsers(page: number, users: User[]) {
    let { results, pagination } = this.paginationService.createPagination(
      page,
      users,
      this.paginationService.verifyPageSize()
    )

    this.users = results
    this.pagination$ = of(pagination)
  }

  ngOnInit(): void {
    this.checkPlaceholder()
    this.activeTab = this.sectionTitle[0]
    this.getUsersFromServer()
  }
}
