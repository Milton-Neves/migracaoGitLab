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
  listWorkfield!: Workfield[]
  isFinished!: boolean
  messageNotFound: boolean = false
  constructor(
    private forwardingService: ForwardingService,
    private paginationService: PaginationService,
    private workFieldService: WorkfieldService
  ) {}

  ngOnInit(): void {
    this.findAllWorkfields()
    this.getForwardings(false)
  }

  getForwardings(isFinished: boolean, page: number = 0) {
    this.isFinished = isFinished
    this.forwardingService
      .findAll('', {
        isFinished,
        sort: 'asc',
        page,
        size: this.paginationService.verifyPageSize(),
      })
      .pipe(
        map((res: any) => res.data),
        tap((res: any) => {
          res.content.length < 1
            ? (this.messageNotFound = true)
            : (this.messageNotFound = false)
          this.paginateCompanies(res.content, res.pagination)
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
