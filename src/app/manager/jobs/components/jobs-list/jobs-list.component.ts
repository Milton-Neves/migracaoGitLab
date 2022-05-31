import { Component, Input, OnInit } from '@angular/core'
import { Job } from '@core/interfaces/resume/job'
import { Observable, of } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { PaginationService } from '@shared/services/pagination.service'
import { JobService } from '../../services/job.service'

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss'],
})
export class JobsListComponent implements OnInit {
  @Input() stylesInformation: any
  jobs: any[] = []
  totalCountJobs: number = 0
  jobs$!: Observable<Job[]>

  constructor(
    private jobService: JobService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.getJobsFromServer()
  }

  getJobsFromServer(page: number = 1, params?: any) {
    this.jobService
      .findAll('', { statusJob: true })
      .pipe(
        tap((jobs) => {
          this.totalCountJobs = jobs.data.length
          this.paginateJobs(page, jobs.data)
        }),
        map((res) => res.data)
      )
      .subscribe()
  }

  paginateJobs(page: number, jobs: any[]) {
    let { results, pagination } = this.paginationService.createPagination(
      page,
      jobs,
      this.paginationService.verifyPageSize()
    )
    console.log(results)
    this.jobs = results
    this.jobs$ = of(pagination)
  }
}
