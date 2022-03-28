import { Component, Input, OnInit } from '@angular/core'
import { JobListModalComponent } from 'app/job-list-modal/job-list-modal.component'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { ResumeProps } from '../../entities/resume.model'
import { ResumeService } from '../../services/resume.service'

@Component({
  selector: 'app-resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.scss'],
})
export class ResumeViewComponent implements OnInit {
  @Input() resumeId?: number
  resume$?: Observable<ResumeProps>

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
    }
  }

  openJobListModal() {
    let modal = this.modalService.open(JobListModalComponent).subscribe()
  }

  closeJobListModal() {
    this.modalService.close()
  }

  ngOnInit(): void {
    this.activeTab = this.sectionTitle[0]
    this.getResume()
  }
}
