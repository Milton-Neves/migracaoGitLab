import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { switchMap } from 'rxjs/operators'
import { CompanyViewComponent } from '../company-view/company-view.component'

@Component({
  selector: 'app-active-company-list',
  templateUrl: './active-company-list.component.html',
  styleUrls: ['./active-company-list.component.scss'],
})
export class ActiveCompanyListComponent implements OnInit {
  @Input() companies: any[] = []
  @Output() modalClosed = new EventEmitter<boolean>()

  constructor(private modal: NgxModalService) {}

  ngOnInit(): void {}

  openModal(id: number): void {
    this.modal
      .open(CompanyViewComponent, { id, isAcceptCompany: true })
      .pipe(switchMap((modal) => modal.onClose))
      .subscribe((res) => {
        this.modalClosed.emit(true)
      })
  }
}
