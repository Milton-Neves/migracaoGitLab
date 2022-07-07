import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Job } from '@core/interfaces/resume/job'
import { Workfield } from '@core/interfaces/resume/workfield'
import { WorkfieldService } from '@shared/services/workfield.service'
import { JobWorkfield } from '../../entities/job-workfield'
import { JobService } from '../../services/job.service'

@Component({
  selector: 'app-jobs-edit',
  templateUrl: './jobs-edit.component.html',
  styleUrls: ['./jobs-edit.component.scss'],
})
export class JobsEditComponent implements OnInit {
  jobToEdited = this.router.getCurrentNavigation()?.extras.state
  selectedWorkField!: number
  workfields!: Observable<Workfield[]>
  jobNameInputIsValid: boolean = false

  constructor(
    private router: Router,
    private workfieldsService: WorkfieldService,
    private jobService: JobService
  ) {
    if (!this.jobToEdited) {
      this.back()
    }
  }

  ngOnInit(): void {
    this.selectedWorkField = this.jobToEdited?.job.workfield

    this.workfields = this.workfieldsService
      .findAll()
      .pipe(map(({ data }) => data))
  }

  updateJob() {
    const job = this.jobToEdited?.job as Job

    const editedJob = { ...job, workfield: this.selectedWorkField }

    this.jobService.update(editedJob, `${job.id}`).subscribe((res) => {
      this.router.navigate(['/gerenciador/cargos'])
    })
  }

  onFocus(): void {
    this.jobNameInputIsValid = this.jobToEdited?.job.name === ''
  }

  back() {
    this.router.navigate(['/gerenciador/cargos'])
  }
}
