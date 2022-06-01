import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { jobWithoutId } from '@core/interfaces/resume/job'
import { Workfield } from '@core/interfaces/resume/workfield'
import { WorkfieldService } from '@shared/services/workfield.service'
import { ToastrService } from 'ngx-toastr'
import { iif, Observable, of } from 'rxjs'
import { map, mergeMap, shareReplay, tap } from 'rxjs/operators'

import { JobService } from '../../services/job.service'

@Component({
  selector: 'app-jobs-registration',
  templateUrl: './jobs-registration.component.html',
  styleUrls: ['./jobs-registration.component.scss'],
})
export class JobsRegistrationComponent implements OnInit {
  job: jobWithoutId = { name: '', workfield: 0 }
  workFields$!: Observable<Workfield[]>
  focus: boolean = false
  searchWorkfield!: string
  nameSelectedWorkfield!: string

  constructor(
    private workfieldService: WorkfieldService,
    private jobService: JobService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  getAllWorkfield() {
    this.workFields$ = this.workfieldService.findAll().pipe(
      map((res: any) => {
        return res.data
      }),
      shareReplay(1)
    )
  }

  createNewJob() {
    this.jobService
      .create(this.job)
      .pipe(
        tap((res) => {
          this.clearFormInformations()
          this.toastr.success('Cargo criado com sucesso!', 'Sucesso')
        })
      )
      .subscribe()
  }

  clearFormInformations() {
    this.router.navigateByUrl('/gerenciador/cargos')
  }

  autoComplete() {
    this.workFields$ = this.workFields$.pipe(
      map((res: any) =>
        res.filter((workField: any) =>
          workField.name.toLowerCase().match(this.searchWorkfield.toLowerCase())
        )
      ),
      mergeMap((listWorkfields) =>
        iif(
          () => listWorkfields.length <= 0,
          of([{ name: 'Nenhum empresa encontrada', disabled: true }]),
          of(listWorkfields)
        )
      )
    )
  }

  changeStateFocus() {
    setTimeout(() => {
      this.focus = !this.focus
      if (this.searchWorkfield != undefined) this.autoComplete()
    }, 100)
  }

  setValueToJobWorkfield(workfield: any) {
    if (!workfield.disabled) {
      this.nameSelectedWorkfield = workfield.name
      this.searchWorkfield = workfield.name
      this.job.workfield = workfield.id
    } else {
      this.job.workfield = 0
      this.nameSelectedWorkfield = ''
    }
  }

  verifyIfJobIsAvaliableToRegister() {
    if (
      this.job.name == '' ||
      this.job.workfield == 0 ||
      this.nameSelectedWorkfield != this.searchWorkfield
    ) {
      return true
    }
    return false
  }

  ngOnInit(): void {
    this.getAllWorkfield()
  }
}
