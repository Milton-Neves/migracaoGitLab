import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { CompanyProps } from '../../entities/company.model'
import { CompanyService } from '../../services/company.service'

@Component({
  selector: 'app-active-company-list',
  templateUrl: './active-company-list.component.html',
  styleUrls: ['./active-company-list.component.scss'],
})
export class ActiveCompanyListComponent implements OnInit {
  company: CompanyProps[] = []
  totalCompanys: number = 0
  companys$!: Observable<CompanyProps[]>

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.getCompanysList()
  }

  getCompanysList(page: number = 1, params?: any) {
    this.companyService
      .getCompanyService({ statusCompanyProps: true })
      .pipe(
        tap((company) => {
          this.company = company.data.length
        }),
        map((res) => res.data)
      )
      .subscribe()
  }

  paginateResumes(page: number, resumes: CompanyProps[]) {
    let { results, pagination } = createPagination(
      page,
      resumes,
      this.verifyPageSize()
    )

    this.company = results
    this.pagination$ = of(pagination)
  }

  viewResume(resumeId: number) {
    let modal = this.modalService
      .open(CompanyPropsViewComponent, {
        resumeId: resumeId,
        phoneMaskService: this.phoneMaskService,
      })
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
