import { Component, Input, OnInit } from '@angular/core'

import { Resume } from '@core/interfaces/resume/resume'
import { Workfield } from '@core/interfaces/resume/workfield'
import { WorkfieldService } from '@shared/services/workfield.service'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { map } from 'rxjs/operators'
import { ResumeService } from '../../services/resume.service'
import { JobListModalComponent } from '../job-list-modal/job-list-modal.component'

@Component({
  selector: 'app-resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.scss'],
})
export class ResumeViewComponent implements OnInit {
  @Input() resume?: Resume
  colorCodes: string[] = []
  sectionTitle = [
    'Dados',
    'Disponibilidade',
    'Formação',
    'Experiência Profissional',
  ]
  activeTab?: string

  constructor(
    private modalService: NgxModalService,
    private workfieldService: WorkfieldService
  ) {}

  ngOnInit(): void {
    this.activeTab = this.sectionTitle[0]
    this.getColorCodes()
  }

  getColorCodes() {
    this.workfieldService
      .findAll()
      .pipe(
        map(({ data }) => {
          let tempWorkfields: Workfield[] = data
          this.resume!.jobApplications.forEach((jobApplication) => {
            tempWorkfields.forEach((workfield) => {
              if (jobApplication.job.workfield == workfield.id) {
                this.colorCodes.push(workfield.colorCode)
              }
            })
          })
        })
      )
      .subscribe()
  }

  openJobsView(resumeId: number) {
    let modal = this.modalService
      .open(JobListModalComponent, { resumeId })
      .subscribe()
  }

  changeTab(tab: any) {
    this.activeTab = tab
  }

  closeModal() {
    this.modalService.close()
  }

  openJobListModal() {
    let modal = this.modalService.open(JobListModalComponent).subscribe()
  }

  closeJobListModal() {
    this.modalService.close()
  }
}
