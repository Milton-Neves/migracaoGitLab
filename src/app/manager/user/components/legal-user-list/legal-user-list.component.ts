import { Component, Input, OnInit, SimpleChanges } from '@angular/core'
import { PaginationService } from '@shared/services/pagination.service'
import { LegalUserService } from 'app/manager/company/services/legal-user.service'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { Observable, of } from 'rxjs'
import { finalize, map } from 'rxjs/operators'

import { UserModalComponent } from '../user-modal/user-modal.component'

@Component({
  selector: 'app-legal-user-list',
  templateUrl: './legal-user-list.component.html',
  styleUrls: ['./legal-user-list.component.scss'],
})
export class LegalUserListComponent implements OnInit {
  @Input() search!: string
  tableColumns: string[] = ['Nome', 'CNPJ', 'Ações']
  pagination$!: Observable<any>
  currentPage!: number
  totalCountLegalUsers: number = 0
  legalUsers: any[] = []
  loading = false

  constructor(
    private modalService: NgxModalService,
    private legalUserService: LegalUserService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {}

  getLegalUsers(page: number = 0, params?: any) {
    this.loading = true
    this.legalUsers = []
    this.legalUserService
      .findAll('', {
        search: this.search,
        valid: true,
        page: page == 0 ? page : page - 1,
        size: this.paginationService.verifyPageSize(),
      })
      .pipe(
        map((res: any) => res.data),
        finalize(() => (this.loading = false))
      )
      .subscribe((res) => {
        this.legalUsers = res.content
        this.totalCountLegalUsers = res.pagination.totalNumberOfElements
        this.pagination$ = of(
          this.paginationService.convertServerPaginationInClientPagination(
            res.pagination
          )
        )
      })
  }

  openModal(userId: number) {
    this.modalService.open(UserModalComponent, { userId }).subscribe()
  }

  getNumberPage() {
    return this.currentPage > 0 && this.currentPage < 10
      ? `0${this.currentPage}`
      : this.currentPage
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.search != '' && this.search.length > 2) {
      this.getLegalUsers()
    } else {
      this.legalUsers = []
    }
  }
}
