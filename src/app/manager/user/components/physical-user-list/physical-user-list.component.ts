import { Component, Input, OnInit, SimpleChanges } from '@angular/core'
import { PhysicalPersonProps } from '@core/interfaces/physical-person/physical-person.model'
import { PaginationService } from '@shared/services/pagination.service'
import { User } from 'app/login/interfaces/user'
import { ToastrService } from 'ngx-toastr'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { PhysicalUserService } from '../../services/physical-user.service'

interface IPhysicalPersonProps extends PhysicalPersonProps {
  physicalUser: User
}

@Component({
  selector: 'app-physical-user-list',
  templateUrl: './physical-user-list.component.html',
  styleUrls: ['./physical-user-list.component.scss'],
})
export class PhysicalUserListComponent implements OnInit {
  @Input() search: String = ''
  physicalUsers: any[] = []
  tableColumns = ['Nome', 'CPF', 'Ações']
  totalCountLegalUsers: number = 0
  pagination$?: Observable<any>

  constructor(
    private physicalUserService: PhysicalUserService,
    private toastr: ToastrService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {}

  getPhysicalUsers(page: number = 0) {
    this.physicalUserService
      .findAll('', {
        search: this.search,
        page: page == 0 ? page : page - 1,
        size: this.paginationService.verifyPageSize(),
      })
      .pipe(map((res: any) => res.data))
      .subscribe((res) => {
        this.physicalUsers = res.content
        this.totalCountLegalUsers = res.pagination.totalNumberOfElements
        console.log(res.pagination)

        this.pagination$ = of(
          this.paginationService.convertServerPaginationInClientPagination(
            res.pagination
          )
        )
      })
  }

  resetPassword(physicalUser: any) {
    const id = physicalUser.cpf ? physicalUser.physicalUser.id : physicalUser.id
    const email = physicalUser.email || null

    this.physicalUserService
      .resetPassword({ id, email })
      .subscribe((res: any) => {
        this.toastr.success(res.message)
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.search != '') {
      this.getPhysicalUsers()
    } else {
      this.physicalUsers = []
    }
  }
}
