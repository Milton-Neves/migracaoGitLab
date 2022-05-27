import { Component, Input } from '@angular/core'
import { Job } from '@core/interfaces/resume/job'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'

@Component({
  selector: 'app-job-list-modal',
  templateUrl: './job-list-modal.component.html',
  styleUrls: ['./job-list-modal.component.scss'],
})
export class JobListModalComponent {
  @Input() jobs?: Job[]
  @Input() colorCodes: string[] = []

  constructor(private modalService: NgxModalService) {}

  closeModal() {
    this.modalService.close()
  }
}
