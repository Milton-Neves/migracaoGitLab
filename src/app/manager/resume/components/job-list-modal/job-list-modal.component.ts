import { Component } from '@angular/core'
import { Input } from '@angular/core'

import { NgxModalService } from 'lib/ngx-modal/src/public-api'

import { JobApplications } from '@core/interfaces/resume/job-applications'

@Component({
  selector: 'app-job-list-modal',
  templateUrl: './job-list-modal.component.html',
  styleUrls: ['./job-list-modal.component.scss'],
})
export class JobListModalComponent {
  @Input() jobApplications?: JobApplications[]
  @Input() colorCodes: string[] = []

  constructor(private modalService: NgxModalService) {}

  closeModal() {
    this.modalService.close()
  }
}
