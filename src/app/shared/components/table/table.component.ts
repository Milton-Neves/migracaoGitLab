import { Component, Input, OnInit } from '@angular/core'
import { ResumeViewComponent } from 'app/manager/resume/components/resume-view/resume-view.component'
import { ResumeProps } from 'app/manager/resume/entities/resume.model'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() resumes?: ResumeProps[]
  constructor(private modalService: NgxModalService) {}

  viewResume(resumeId: number) {
    let modal = this.modalService
      .open(ResumeViewComponent, { resumeId })
      .subscribe()
  }

  ngOnInit(): void {}
}
