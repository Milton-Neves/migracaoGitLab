import { Component, Input, OnDestroy, OnInit } from '@angular/core'

import { map, switchMap, tap } from 'rxjs/operators'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'

import { Resume } from '@core/interfaces/resume/resume'
import { Workfield } from '@core/interfaces/resume/workfield'
import { WorkfieldService } from '@shared/services/workfield.service'
import { JobListModalComponent } from '../job-list-modal/job-list-modal.component'
import { Observable, Subscriber, Subscription } from 'rxjs'
import { JobApplications } from '@core/interfaces/resume/job-applications'
import { ResumeService } from '../../services/resume.service'

@Component({
  selector: 'app-resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.scss'],
})
export class ResumeViewComponent implements OnInit, OnDestroy {
  @Input() resumeId?: number
  colorCodes: string[] = []
  sectionTitle = [
    'Dados',
    'Disponibilidade',
    'Formação',
    'Experiência Profissional',
  ]
  activeTab?: string
  resumeSubscription = new Subscription()
  resume!: Resume

  constructor(
    private modalService: NgxModalService,
    private workfieldService: WorkfieldService,
    private resumeService: ResumeService
  ) {}

  ngOnInit(): void {
    this.activeTab = this.sectionTitle[0]

    this.resumeSubscription = this.resumeService
      .findOne(`${this.resumeId}`)
      .pipe(
        map(({ data }) => data),
        tap((resume) => (this.resume = resume)),
        switchMap((resume: Resume) => this.getColorCodes(resume))
      )
      .subscribe()
  }

  getColorCodes(resume: Resume) {
    return this.workfieldService.findAll().pipe(
      map(({ data }) => {
        if (resume.jobApplications.length) {
          return
        }

        let tempWorkfields: Workfield[] = data
        resume.jobApplications.forEach((jobApplication) => {
          tempWorkfields.forEach((workfield) => {
            if (jobApplication.job.workfield == workfield.id) {
              this.colorCodes.push(workfield.colorCode)
            }
          })
        })
      })
    )
  }

  openJobsView(jobApplications: JobApplications[], colorCodes: string[]) {
    let modal = this.modalService
      .open(JobListModalComponent, { jobApplications, colorCodes })
      .subscribe()
  }

  changeTab(tab: any) {
    this.activeTab = tab
  }

  closeModal() {
    this.modalService.close()
  }

  ngOnDestroy(): void {
    this.resumeSubscription.unsubscribe()
  }
}
