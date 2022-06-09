import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Job } from '@core/interfaces/resume/job'
import { PaginationService } from '@shared/services/pagination.service'
import { Observable, of } from 'rxjs'

import { WorkfieldService } from '@shared/services/workfield.service'
import { tap } from 'rxjs/operators'

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss'],
})
export class JobsListComponent implements OnInit {
  workfield: any[] = []
  tempJobsList: any[] = []
  tableColumns = ['Nome', 'Área de Atuação', 'Situação', 'Ações']
  @Input() stylesInformation: any
  totalCountJobs: number = 0
  pagination$?: Observable<any>

  constructor(
    private paginationService: PaginationService,
    private workfieldService: WorkfieldService,
    private router: Router
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
        })
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

  navigaToRegistrationPage() {
    this.router.navigate(['/gerenciador/cargos/cadastrar'])
  }

  navigaToEditPage(jobsId?: number) {
    this.router.navigate(['/gerenciador/cargos', 'editar', '1'])
  }
}
