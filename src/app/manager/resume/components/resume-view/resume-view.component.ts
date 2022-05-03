import { Component, Input, OnInit } from '@angular/core'

import { Resume } from '@core/interfaces/resume/resume'
import { Workfield } from '@core/interfaces/resume/workfield'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { map } from 'rxjs/operators'
import { ResumeService } from '../../services/resume.service'

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
    private resumeService: ResumeService
  ) {}

  ngOnInit(): void {
    this.activeTab = this.sectionTitle[0]
    this.getColorCodes()
  }

  getColorCodes() {
    this.resumeService
      .getWorkfields()
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

  changeTab(tab: any) {
    this.activeTab = tab
  }

  closeModal() {
    this.modalService.close()
  }
}
