import { Component, Input, OnInit } from '@angular/core'
import { Resume } from '@core/interfaces/resume/resume'
import { Workfield } from '@core/interfaces/resume/workfield'
import { WorkfieldService } from '@shared/services/workfield.service'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { ResumeService } from '../../services/resume.service'

@Component({
  selector: 'app-resume-jobs-view',
  templateUrl: './resume-jobs-view.component.html',
  styleUrls: ['./resume-jobs-view.component.scss'],
})
export class ResumeJobsViewComponent implements OnInit {
  @Input() resumeId?: number
  resume$?: Observable<Resume>
  colorCodes: string[] = []

  constructor(
    private modalService: NgxModalService,
    private resumeService: ResumeService,
    private workfieldService: WorkfieldService
  ) {}

  ngOnInit(): void {
    this.getResume()
    this.getColorCodes()
  }

  closeModal() {
    this.modalService.close()
  }

  getResume() {
    this.resume$ = this.resumeService
      .findOne(`${this.resumeId}`)
      .pipe(map((resume) => resume.data))
  }

  getColorCodes() {
    this.resume$?.subscribe((resume) => {
      this.workfieldService.findAll().subscribe((workfield) => {
        let tempWorkfields: Workfield[] = workfield.data
        resume.jobs.forEach((job) => {
          tempWorkfields.forEach((workfield) => {
            if (job.workfield == workfield.id) {
              this.colorCodes.push(workfield.colorCode)
            }
          })
        })
      })
    })
  }
}
