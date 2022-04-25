import { Component, Input, OnInit } from '@angular/core'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ResumeProps, Workfield } from '../../entities/resume.model'
import { ResumeService } from '../../services/resume.service'

@Component({
  selector: 'app-resume-jobs-view',
  templateUrl: './resume-jobs-view.component.html',
  styleUrls: ['./resume-jobs-view.component.scss'],
})
export class ResumeJobsViewComponent implements OnInit {
  @Input() resumeId?: number
  resume$?: Observable<ResumeProps>
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
