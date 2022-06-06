import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { Subscriber } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import { CompanyViewComponent } from '../company-view/company-view.component'

@Component({
  selector: 'tr[app-company-list-under-analysis]',
  templateUrl: './company-list-under-analysis.component.html',
  styleUrls: ['./company-list-under-analysis.component.scss'],
})
export class CompanyListUnderAnalysisComponent implements OnInit {
  @Input() company!: any
  @Output() modalClosed = new EventEmitter<boolean>()
  subscrptions = new Subscriber()
  constructor(private modal: NgxModalService) {}

  ngOnInit(): void {
    this.company.createdAt = this.company.createdAt.split(' ')[0]
  }

  openModal(id: number): void {
    this.modal
      .open(CompanyViewComponent, { id, isAcceptCompany: true })
      .pipe(switchMap((modal) => modal.onClose))
      .subscribe((res) => {
        this.modalClosed.emit(true)
      })
  }

  ngOnDestroy(): void {
    this.subscrptions.unsubscribe()
  }
}
