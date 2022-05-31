import { Component, Input, OnInit } from '@angular/core'
import { Job } from '@core/interfaces/resume/job'
import { Observable, of } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { ResumeService } from 'app/manager/resume/services/resume.service'
import { PaginationService } from '@shared/services/pagination.service'
import { JobService } from '../../services/job.service'
import { ApiResponse } from '@core/interfaces/api-response.model'

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss'],
})
export class JobsListComponent implements OnInit {
  @Input() stylesInformation: any
  // jobs: Job[] = []
  jobs!: any[]
  totalCountJobs: number = 0
  // pagination$?: Observable<any>
  jobs$!: Observable<Job[]>

  constructor(
    private jobService: JobService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.getJobsFromServer()
    // this.getJobList()
  }

  // getJobList() {
  //   this.jobService
  //     .findAll()
  //     .subscribe((job: ApiResponse<Job[]>) => {
  //       this.jobs = job.data
  //       console.log(job.data)
  //     })
  // }

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

    this.jobs = results
    this.jobs$ = of(pagination)
  }
}
