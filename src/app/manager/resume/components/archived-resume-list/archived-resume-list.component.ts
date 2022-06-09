import { Component, OnInit } from '@angular/core'
import { Resume } from '@core/interfaces/resume/resume'
import { PaginationService } from '@shared/services/pagination.service'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { Observable, of } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'

import { ResumeService } from '../../services/resume.service'
import { ResumeViewComponent } from '../resume-view/resume-view.component'
import { UnarchivingModalComponent } from '../unarchiving-modal/unarchiving-modal.component'

const ITEMS_PER_PAGE = 6

@Component({
  selector: 'app-archived-resume-list',
  templateUrl: './archived-resume-list.component.html',
  styleUrls: ['./archived-resume-list.component.scss'],
})
export class ArchivedResumeListComponent implements OnInit {
  tableColumns = ['Nome', 'Telefone(s)', 'Situação', 'Ações']
  resumes: Resume[] = []
  totalCountResumes: number = 0
  currentPage!: number
  pagination$?: Observable<any>

  constructor(
    private resumeService: ResumeService,
    private modalService: NgxModalService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.getResumesFromServer()
  }

  openUnarchivingModal(resumeId: number) {
    this.modalService
      .open(UnarchivingModalComponent, { resumeId })
      .pipe(
        switchMap((reference) => reference.onClose),
        tap(() => this.getResumesFromServer(this.currentPage))
      )
      .subscribe()
  }

  getResumesFromServer(page: number = 1, params?: any) {
    this.resumeService
      .findAll('', { statusResume: false })
      .pipe(
        tap(({ data }) => {
          this.currentPage = page
          this.totalCountResumes = data.length
          this.paginateResumes(page, data)
        }),
        map(({ data }) => data)
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

  openViewResumeModal(resumeId: number) {
    let modal = this.modalService
      .open(ResumeViewComponent, {
        resumeId,
      })
      .subscribe()
  }
}
