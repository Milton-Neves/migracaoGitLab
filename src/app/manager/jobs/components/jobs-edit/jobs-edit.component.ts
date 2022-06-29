import { Component, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { Workfield } from '@core/interfaces/resume/workfield'
import { WorkfieldService } from '@shared/services/workfield.service'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { JobWorkfield } from '../../entities/job-workfield'

@Component({
  selector: 'app-jobs-edit',
  templateUrl: './jobs-edit.component.html',
  styleUrls: ['./jobs-edit.component.scss'],
})
export class JobsEditComponent implements OnInit {
  infoJob = this.router.getCurrentNavigation()?.extras.state
  jobWorkfieldEdit: JobWorkfield[] = []
  jobFields!: Observable<Workfield[]>
  jobEdit!: Workfield

  constructor(
    private router: Router,
    private workfieldsService: WorkfieldService
  ) {
    !this.infoJob ? this.back() : ''
  }

  ngOnInit(): void {
    this.jobFields = this.workfieldsService
      .findAll()
      .pipe(map((res: any) => res.data))
    // this.jobEdit = this.workfieldsService.update(this.jobEdit)
  }

  updateJobsEdit() {
    this.workfieldsService.update(this.jobEdit).subscribe((res) => {
      console.log(res)
      // this.workfieldsService.showMessage('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
      this.router.navigate(['/gerenciador/cargos'])
    })
  }

  back() {
    this.router.navigate(['/gerenciador/cargos'])
  }
}
