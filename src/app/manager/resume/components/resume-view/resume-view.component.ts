import { Component, Input, OnInit } from '@angular/core'
import { Resume } from '@core/interfaces/resume/resume'
import { Workfield } from '@core/interfaces/resume/workfield'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { MaskApplierService } from 'ngx-mask'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { ResumeService } from '../../services/resume.service'

@Component({
  selector: 'app-resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.scss'],
})
export class ResumeViewComponent implements OnInit {
  @Input() resumeId?: number
  @Input() phoneMaskService?: MaskApplierService
  resume$?: Observable<Resume>
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

  changeTab(tab: any) {
    this.activeTab = tab
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
      this.getColorCodes()
    }
  }

  ngOnInit(): void {
    this.activeTab = this.sectionTitle[0]
    this.getResume()
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
