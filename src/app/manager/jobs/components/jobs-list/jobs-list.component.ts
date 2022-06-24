import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, of } from 'rxjs'

import { tap } from 'rxjs/operators'
import { JobService } from '../../services/job.service'
import { JobWorkfield } from '../../entities/job-workfield'

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss'],
})
export class JobsListComponent implements OnInit {
  @Input() stylesInformation: any
  tableColumns = ['Nome', 'Área de Atuação', 'Situação', 'Ações']
  jobWorkfieldList: JobWorkfield[] = []
  pagination$?: Observable<any>
  criteriaObject: any = {
    size: 10,
  }

  totalCountJobs = 0
  visibleItems = 0

  constructor(private router: Router, private jobService: JobService) {}

  ngOnInit(): void {
    this.getJobs()
  }

  getJobs(page: number = 0, params?: any) {
    this.jobService
      .listAllWithWorkfieldColor({
        page,
        ...this.criteriaObject,
        ...params,
      })
      .pipe(
        tap(({ data }) => {
          const { content, pagination } = data
          this.jobWorkfieldList = content
          this.totalCountJobs = pagination.totalNumberOfElements
          this.visibleItems = pagination.offset + pagination.numberOfElements

          this.pagination$ = of({
            current: page + 1,
            next: pagination.lastPage ? undefined : page + 1,
            previous: pagination.firstPage ? undefined : page - 1,
          })
        })
      )
      .subscribe()
  }

  searchJobEvent(search: string) {
    if (search.length > 0) {
      this.criteriaObject.search = search
    } else {
      delete this.criteriaObject.search
    }
    this.getJobs()
  }

  navigaToRegistrationPage() {
    this.router.navigate(['/gerenciador/cargos/cadastrar'])
  }

  navigaToEditPage(job: any) {
    this.router.navigate(['/gerenciador/cargos', 'editar'], { state: job })
  }
}
