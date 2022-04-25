import { Component, OnInit } from '@angular/core'
import { Resume } from '@core/interfaces/resume/resume'
import { Workfield } from '@core/interfaces/resume/workfield'
import { createPagination } from '@shared/utils/pagination.utils'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { Observable, of } from 'rxjs'
import { map, tap } from 'rxjs/operators'

import { ResumeService } from '../../services/resume.service'
import { ResumeJobsViewComponent } from '../resume-jobs-view/resume-jobs-view.component'
import { ResumeViewComponent } from '../resume-view/resume-view.component'

const ITEMS_PER_PAGE = 6
@Component({
  selector: 'app-active-resume-list',
  templateUrl: './active-resume-list.component.html',
  styleUrls: ['./active-resume-list.component.scss'],
})
export class ActiveResumeListComponent implements OnInit {
  resumes: Resume[] = []
  totalCountResumes: number = 0
  pagination$?: Observable<any>
  colorCodes: string[] = []
  colorPromise: Promise<boolean> = Promise.resolve(false)

  constructor(
    private resumeService: ResumeService,
    private modalService: NgxModalService
  ) {}

  ngOnInit(): void {
    this.getResumesFromServer()
  }

  getResumesFromServer(page: number = 1, params?: any) {
    this.resumeService
      .getResume({ statusResume: true })
      .pipe(
        tap((resume) => {
          this.totalCountResumes = resume.data.length
          this.paginateResumes(page, resume.data)
          this.getColorCodes()
        }),
        map((res) => res.data)
      )
      .subscribe()
  }

  paginateResumes(page: number, resumes: Resume[]) {
    let { results, pagination } = createPagination(
      page,
      resumes,
      this.verifyPageSize()
    )

    this.resumes = results
    this.pagination$ = of(pagination)
  }

  viewResume(resumeId: number) {
    let modal = this.modalService
      .open(ResumeViewComponent, { resumeId })
      .subscribe()
  }

  verifyPageSize(): number {
    if (document.body.getBoundingClientRect().width < 768) return ITEMS_PER_PAGE
    const contentSizeHeight = document.body.getBoundingClientRect().height * 0.6
    const cardSizeHeight = 80
    return Math.floor(contentSizeHeight / cardSizeHeight)
  }

  openJobsView(resumeId: number) {
    let modal = this.modalService
      .open(ResumeJobsViewComponent, { resumeId })
      .subscribe()
  }

  getColorCodes() {
    this.resumeService.getWorkfields().subscribe((workfields) => {
      let tempWorkfields: Workfield[] = workfields.data

      this.resumes.forEach((resume, index) => {
        tempWorkfields.forEach((workfield) => {
          if (resume.jobApplications[0].job.workfield == workfield.id) {
            this.colorCodes.push(workfield.colorCode)
            this.colorPromise = Promise.resolve(true)
          }
        })
      })
    })
  }
}
