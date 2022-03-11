import { Component, OnInit } from '@angular/core'
import { createPagination } from '@shared/utils/pagination.utils'
import { Observable, of } from 'rxjs'
import { map, tap } from 'rxjs/operators'

import { ResumeProps } from '../../entities/resume.model'
import { ResumeService } from '../../services/resume.service'

const ITEMS_PER_PAGE = 6
@Component({
  selector: 'app-active-resume-list',
  templateUrl: './active-resume-list.component.html',
  styleUrls: ['./active-resume-list.component.scss'],
})
export class ActiveResumeListComponent implements OnInit {
  resumes: ResumeProps[] = []
  totalCountResumes: number = 0
  pagination$?: Observable<any>

  constructor(private resumeService: ResumeService) {}

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
        }),
        map((res) => res.data)
      )
      .subscribe()
  }

  paginateResumes(page: number, resumes: ResumeProps[]) {
    let { results, pagination } = createPagination(
      page,
      resumes,
      this.verifyPageSize()
    )

    this.resumes = results
    this.pagination$ = of(pagination)
  }

  verifyPageSize(): number {
    if (document.body.getBoundingClientRect().width < 768) return ITEMS_PER_PAGE
    const contentSizeHeight = document.body.getBoundingClientRect().height * 0.6
    const cardSizeHeight = 80
    return Math.floor(contentSizeHeight / cardSizeHeight)
  }
}
