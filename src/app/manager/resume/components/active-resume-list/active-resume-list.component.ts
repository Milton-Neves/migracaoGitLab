import { Component, OnInit } from '@angular/core'

import { Observable, of } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'

import { Resume } from '@core/interfaces/resume/resume'
import { WorkfieldService } from '@shared/services/workfield.service'
import { ResumeService } from '../../services/resume.service'
import { ResumeJobsViewComponent } from '../resume-jobs-view/resume-jobs-view.component'
import { ResumeViewComponent } from '../resume-view/resume-view.component'
import { PaginationService } from '@shared/services/pagination.service'
import { ArchivingModalComponent } from '../archiving-modal/archiving-modal.component'

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
      .findAll('', { statusResume: true })
      .pipe(
        tap((resume) => {
          this.totalCountResumes = resume.data.length
          this.paginateResumes(page, resume.data)
        }),
        map((res) => res.data)
      )
      .subscribe()
  }

  paginateResumes(page: number, resumes: any[]) {
    let { results, pagination } = this.paginationService.createPagination(
      page,
      resumes,
      this.paginationService.verifyPageSize()
    )

    this.resumes = results
    this.pagination$ = of(pagination)
  }

  viewResume(resumeId: number) {
    let modal = this.modalService
      .open(ResumeViewComponent, {
        resumeId: resumeId,
      })
      .subscribe()
  }

  openJobsView(resumeId: number) {
    let modal = this.modalService
      .open(ResumeJobsViewComponent, { resumeId })
      .subscribe()
  }
  openArchivingModal() {
    let modal = this.modalService.open(ArchivingModalComponent).subscribe()
  }
}
