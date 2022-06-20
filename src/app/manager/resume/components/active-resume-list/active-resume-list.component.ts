import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { Resume } from '@core/interfaces/resume/resume'
import { PaginationService } from '@shared/services/pagination.service'
import { WorkfieldService } from '@shared/services/workfield.service'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { Observable, of } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'

import { ResumeService } from '../../services/resume.service'
import { ArchivingModalComponent } from '../archiving-modal/archiving-modal.component'
import { ResumeJobsViewComponent } from '../resume-jobs-view/resume-jobs-view.component'
import { ResumeViewComponent } from '../resume-view/resume-view.component'

@Component({
  selector: 'app-active-resume-list',
  templateUrl: './active-resume-list.component.html',
  styleUrls: ['./active-resume-list.component.scss'],
})
export class ActiveResumeListComponent implements OnInit, OnChanges {
  @Input() generalInfo!: string
  tableColumns = ['Nome', 'Telefone(s)', 'Situação', 'Ações']
  resumes: Resume[] = []
  totalCountResumes: number = 0
  pagination$?: Observable<any>
  colorCodes: string[] = []
  currentPage!: number
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
      .findAll('', { statusResume: true, ...params })
      .pipe(
        tap((resume) => {
          this.currentPage = page
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

  openArchivingModal(resume: Resume) {
    let modal = this.modalService
      .open(ArchivingModalComponent, { resume })
      .pipe(
        switchMap((reference) => reference.onClose),
        tap(() => this.getResumesFromServer(this.currentPage))
      )
      .subscribe()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.generalInfo.currentValue != undefined)
      this.getResumesFromServer(1, { generalInfo: this.generalInfo })
  }
}
