import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Job } from '@core/interfaces/resume/job'
import { Workfield } from '@core/interfaces/resume/workfield'
import { WorkfieldService } from '@shared/services/workfield.service'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { JobWorkfield } from '../../entities/job-workfield'
import { JobService } from '../../services/job.service'

@Component({
  selector: 'app-jobs-edit',
  templateUrl: './jobs-edit.component.html',
  styleUrls: ['./jobs-edit.component.scss'],
})
export class JobsEditComponent implements OnInit {
  infoJob = this.router.getCurrentNavigation()?.extras.state
  jobWorkfieldEdit: JobWorkfield[] = []
  jobFields!: Observable<Workfield[]>
  alert: boolean = false
  selected!: number

  constructor(
    private router: Router,
    private workfieldsService: WorkfieldService,
    private jobService: JobService
  ) {
    !this.infoJob ? this.back() : ''
  }

  ngOnInit(): void {
    this.selected = this.infoJob?.job.workfield
    this.jobFields = this.workfieldsService
      .findAll()
      .pipe(map((res: any) => res.data))
  }

  updateJobsEdit() {
    const job = this.infoJob?.job as Job
    const editJob = { ...job, workfield: this.selected }
    this.jobService.update(editJob, `${job.id}`).subscribe((res) => {
      this.router.navigate(['/gerenciador/cargos'])
    })
  }

  onFocus(): void {
    this.alert = this.infoJob?.job.name === ''
  }

  back() {
    this.router.navigate(['/gerenciador/cargos'])
  }
}
