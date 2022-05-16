import { Component, OnInit } from '@angular/core'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { Observable } from 'rxjs'
import { ResumeService } from 'app/manager/resume/services/resume.service'
import { Input } from '@angular/core'
import { map } from 'rxjs/operators'
import { Resume } from '@core/interfaces/resume/resume'
import { Workfield } from '@core/interfaces/resume/workfield'

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
    private resumeService: ResumeService
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
        .getOneResume(this.resumeId)
        .pipe(map((resume) => resume.data))
    }
  }

  getColorCodes() {
    this.resume$?.subscribe((resume) => {
      this.resumeService.getWorkfields().subscribe((workfields) => {
        let tempWorkfields: Workfield[] = workfields.data

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
