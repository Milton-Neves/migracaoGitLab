import { Component, OnInit } from '@angular/core'
import { ResumeViewComponent } from 'app/manager/resume/components/resume-view/resume-view.component'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(private modalService: NgxModalService) {}

  viewResume() {
    let modal = this.modalService.open(ResumeViewComponent).subscribe()
  }

  ngOnInit(): void {}
}
