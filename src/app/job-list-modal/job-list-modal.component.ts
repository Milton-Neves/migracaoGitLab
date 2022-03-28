import { Component, OnInit } from '@angular/core'
import { ResumeProps } from 'app/manager/resume/entities/resume.model'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { Observable } from 'rxjs'
import { ResumeService } from 'app/manager/resume/services/resume.service'
import { Input } from '@angular/core'
import { map } from 'rxjs/operators'
import { JobApplication } from 'app/manager/resume/entities/resume.model'

@Component({
  selector: 'app-job-list-modal',
  templateUrl: './job-list-modal.component.html',
  styleUrls: ['./job-list-modal.component.scss'],
})
export class JobListModalComponent implements OnInit {
  resume$?: Observable<ResumeProps[]>
  @Input() resumeId?: number

  constructor(
    private modalService: NgxModalService,
    private resumeService: ResumeService
  ) {}

  ngOnInit(): void {
    this.resume$ = this.resumeService.getResume().pipe(map((res) => res.data))
  }

  closeModal() {
    this.modalService.close()
  }
}
