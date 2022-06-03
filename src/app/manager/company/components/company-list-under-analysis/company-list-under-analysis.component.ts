import { Component, Input, OnInit } from '@angular/core'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'

import { CompanyViewComponent } from '../company-view/company-view.component'

@Component({
  selector: 'tr[app-company-list-under-analysis]',
  templateUrl: './company-list-under-analysis.component.html',
  styleUrls: ['./company-list-under-analysis.component.scss'],
})
export class CompanyListUnderAnalysisComponent implements OnInit {
  @Input() company!: any
  constructor(private modal: NgxModalService) {}

  ngOnInit(): void {
    this.company.createdAt = this.company.createdAt.split(' ')[0]
  }

  openModal(id: number): void {
    console.log(id)

    this.modal
      .open(CompanyViewComponent, { id, isAcceptCompany: true })
      .subscribe()
  }
}
