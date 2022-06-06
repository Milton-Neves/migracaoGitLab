import { Component, OnInit } from '@angular/core'
import { PaginationService } from '@shared/services/pagination.service'
import { Observable, of } from 'rxjs'
import { map, tap } from 'rxjs/operators'

import { WorkfieldService } from '@shared/services/workfield.service'

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss'],
})
export class JobsListComponent implements OnInit {
  workfield: any[] = []
  tempJobsList: any[] = []
  totalCountJobs: number = 0
  pagination$?: Observable<any>

  constructor(
    private paginationService: PaginationService,
    private workfieldService: WorkfieldService
  ) {}

  ngOnInit(): void {
    this.getJobsFromServer()
  }

  getJobsFromServer(page: number = 1, params?: any) {
    this.workfieldService
      .findAll()
      .pipe(
        tap((workfields: any) => {
          this.totalCountJobs = 0
          this.tempJobsList = []
          workfields.data.forEach((position: any) => {
            this.tempJobsList = this.tempJobsList.concat(
              position.jobs.map((value: any) => {
                return {
                  name: value.name,
                  color: position.colorCode,
                  workfield: position.name,
                }
              })
            )
            this.totalCountJobs = this.tempJobsList.length
          })
          this.paginateJobs(page, this.tempJobsList)
        }),
        map((res) => res.data)
      )
      .subscribe()
  }

  paginateJobs(page: number, workfield: any[]) {
    let { results, pagination } = this.paginationService.createPagination(
      page,
      workfield,
      this.paginationService.verifyPageSize()
    )

    this.workfield = results
    this.pagination$ = of(pagination)
  }
}
