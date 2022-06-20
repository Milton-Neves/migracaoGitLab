import { Component, OnInit } from '@angular/core'
import { PaginationService } from '@shared/services/pagination.service'
import { LegalUserService } from 'app/manager/company/services/legal-user.service'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { Observable, of } from 'rxjs'
import { map, tap } from 'rxjs/operators'

@Component({
  selector: 'app-legal-user-list',
  templateUrl: './legal-user-list.component.html',
  styleUrls: ['./legal-user-list.component.scss'],
})
export class LegalUserListComponent implements OnInit {
  tableColumns: string[] = ['Nome', 'CNPJ', 'Ações']
  pagination$!: Observable<any>
  currentPage!: number
  totalCountLegalUsers: number = 0
  legalUsers = []

  constructor(
    private modalService: NgxModalService,
    private legalUserService: LegalUserService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.getLegalUsers()
  }

  getLegalUsers(page: number = 1, params?: any) {
    this.legalUserService
      .findAll()
      .pipe(
        tap(({ data }) => {
          this.currentPage = page
          this.totalCountLegalUsers = data.length
          this.paginateLegalUsers(page, data)
        })
      )
      .subscribe()
  }

  paginateLegalUsers(page: number, users: any[]) {
    let { results, pagination } = this.paginationService.createPagination(
      page,
      users,
      this.paginationService.verifyPageSize()
    )

    this.legalUsers = results
    this.pagination$ = of(pagination)
  }

  getNumberPage() {
    return this.currentPage > 0 && this.currentPage < 10
      ? `0${this.currentPage}`
      : this.currentPage
  }
}
