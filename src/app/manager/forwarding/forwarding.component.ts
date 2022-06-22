import { Component, OnInit } from '@angular/core'
import { Forwarding } from '@core/interfaces/resume/forwading'
import { Workfield } from '@core/interfaces/resume/workfield'
import { PaginationService } from '@shared/services/pagination.service'
import { WorkfieldService } from '@shared/services/workfield.service'
import { Observable, of } from 'rxjs'
import { map, tap } from 'rxjs/operators'

import { ForwardingService } from './services/forwarding.service'

@Component({
  selector: 'app-forwarding',
  templateUrl: './forwarding.component.html',
  styleUrls: ['./forwarding.component.scss'],
})
export class ForwardingComponent implements OnInit {
  forwardings: any[] = []
  pagination$!: Observable<any>
  listWorkfield: Workfield[] = []
  paramsToRequst!: {
    isFinished: boolean
    actualPage: number
    sort: string
    search: string
  }
  searchTerm: string = ''
  messageNotFound: boolean = false
  visibleItems = 0
  totalCountForwardings = 0
  constructor(
    private forwardingService: ForwardingService,
    private paginationService: PaginationService,
    private workFieldService: WorkfieldService
  ) {}

  ngOnInit(): void {
    this.findAllWorkfields()
    this.getForwardings(false)
  }

  checkInputSearch(term: string) {
    term != '' ? (this.searchTerm = term) : (this.searchTerm = '')
    setTimeout(
      () =>
        this.getForwardings(
          this.paramsToRequst.isFinished,
          this.paramsToRequst.actualPage,
          this.paramsToRequst.sort
        ),
      100
    )
  }

  getForwardings(isFinished: boolean, page: number = 0, sort: string = 'desc') {
    this.paramsToRequst = {
      isFinished,
      actualPage: page,
      sort,
      search: this.searchTerm,
    }
    this.forwardingService
      .findAll('', {
        isFinished,
        sort,
        page,
        size: this.paginationService.verifyPageSize(),
        search: this.paramsToRequst.search,
      })
      .pipe(
        map((res: any) => res.data),
        tap((res: any) => {
          res.content.length < 1
            ? (this.messageNotFound = true)
            : (this.messageNotFound = false)
          this.paginateCompanies(res.content, res.pagination)
          this.visibleItems =
            res.pagination.offset + res.pagination.numberOfElements
          this.totalCountForwardings = res.pagination.totalNumberOfElements
        })
      )
      .subscribe()
  }

  paginateCompanies(forwardings: Forwarding[], pagination: any) {
    let paginated = {
      next: pagination.hasNextPage ? pagination.page : undefined,
      current: pagination.page,
      previous: !pagination.firstPage ? pagination.page - 2 : undefined,
      totalElementPerPage: pagination.size,
    }
    this.forwardings = forwardings.map(
      (value) =>
        (value = Object.assign({
          ...value,
          ...this.findColorAndNameByJobName(value.job),
        }))
    )
    this.pagination$ = of(paginated)
  }

  findAllWorkfields() {
    this.workFieldService
      .findAll()
      .pipe(
        map((res) => res.data),
        tap((res) => (this.listWorkfield = res))
      )
      .subscribe()
  }

  findColorAndNameByJobName(jobName: string) {
    let workfields = Array.from(this.listWorkfield)
    let selectedColor = workfields.find((workfield: any) =>
      workfield.jobs.find(
        (job: { id: number; name: string }) => job.name == jobName
      )
    )?.colorCode
    return { jobName, selectedColor }
  }
}
