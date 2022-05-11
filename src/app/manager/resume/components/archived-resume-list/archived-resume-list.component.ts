import { Component, OnInit } from '@angular/core'

import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { Observable, of } from 'rxjs'
import { map, tap } from 'rxjs/operators'

import { Resume } from '@core/interfaces/resume/resume'
import { ResumeService } from '../../services/resume.service'
import { ResumeViewComponent } from '../resume-view/resume-view.component'
import { ResumeJobsViewComponent } from '../resume-jobs-view/resume-jobs-view.component'
import { Workfield } from '@core/interfaces/resume/workfield'
import { WorkfieldService } from '@shared/services/workfield.service'
import { PaginationService } from '@shared/services/pagination.service'

const ITEMS_PER_PAGE = 6

@Component({
  selector: 'app-archived-resume-list',
  templateUrl: './archived-resume-list.component.html',
  styleUrls: ['./archived-resume-list.component.scss'],
})
export class ArchivedResumeListComponent implements OnInit {
  resumes: Resume[] = []
  totalCountResumes: number = 0
  pagination$?: Observable<any>
  colorCodes: string[] = []
  colorPromise: Promise<boolean> = Promise.resolve(false)

  constructor(
    private resumeService: ResumeService,
    private workfieldService: WorkfieldService,
    private modalService: NgxModalService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.getResumesFromServer()
  }

  getResumesFromServer(page: number = 1, params?: any) {
    this.resumeService
      .findAll('', { statusResume: false })
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
    let { results, pagination } = this.paginationService.createPagination(
      page,
      resumes,
      this.paginationService.verifyPageSize()
    )

    this.resumes = results
    this.pagination$ = of(pagination)
  }

  viewResume(resume: Resume) {
    let modal = this.modalService
      .open(ResumeViewComponent, {
        resume: resume,
      })
      .subscribe()
  }

  openJobsView(resumeId: number) {
    let modal = this.modalService
      .open(ResumeJobsViewComponent, { resumeId })
      .subscribe()
  }

  getColorCodes() {
    this.workfieldService.findAll().subscribe((workfield) => {
      let tempWorkfields: Workfield[] = workfield.data

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
