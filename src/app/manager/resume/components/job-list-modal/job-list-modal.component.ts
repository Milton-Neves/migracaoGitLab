import { Component, OnInit } from '@angular/core'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { Observable } from 'rxjs'
import { ResumeService } from 'app/manager/resume/services/resume.service'
import { Input } from '@angular/core'
import { map } from 'rxjs/operators'
import { Resume } from '@core/interfaces/resume/resume'
import { Workfield } from '@core/interfaces/resume/workfield'
import { WorkfieldService } from '@shared/services/workfield.service'

@Component({
  selector: 'app-job-list-modal',
  templateUrl: './job-list-modal.component.html',
  styleUrls: ['./job-list-modal.component.scss'],
})
export class JobListModalComponent implements OnInit {
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
    if (this.resumeId === undefined) {
      this.closeModal()
    } else {
      this.resume$ = this.resumeService
        .findOne(`${this.resumeId}`)
        .pipe(map((resume) => resume.data))
    }
  }

  getColorCodes() {
    this.resume$?.subscribe((resume) => {
      this.workfieldService.findAll().subscribe((workfield) => {
        let tempWorkfields: Workfield[] = workfield.data
        resume.jobApplications.forEach((jobApplication) => {
          tempWorkfields.forEach((workfield) => {
            if (jobApplication.job.workfield == workfield.id) {
              this.colorCodes.push(workfield.colorCode)
            }
          })
        })
      })
    })
  }
}
