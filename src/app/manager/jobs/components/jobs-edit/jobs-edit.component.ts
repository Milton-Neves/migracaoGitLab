import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import {
  ActivatedRoute,
  CanActivate,
  Router,
  RouterState,
} from '@angular/router'
import { Job } from '@core/interfaces/resume/job'
import { Workfield } from '@core/interfaces/resume/workfield'
import { WorkfieldService } from '@shared/services/workfield.service'
import { map } from 'lodash-es'
import { Subscription } from 'rxjs'
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

  constructor(
    private router: Router,
    private workfieldsService: WorkfieldService
  ) {
    // console.log(this.infoJob)
    !this.infoJob ? this.back() : ''
  }

  ngOnInit(): void {}

  back() {
    this.router.navigate(['/gerenciador/cargos'])
  }
}
