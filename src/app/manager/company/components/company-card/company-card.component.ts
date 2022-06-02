import { CompanyViewComponent } from './../company-view/company-view.component'
import { NgxModalService } from './../../../../../lib/ngx-modal/src/lib/ngx-modal.service'
import { Component, Input, OnInit } from '@angular/core'
import { CompanyEditComponent } from '../company-edit/company-edit.component'
import { InformationCard } from '@core/interfaces/information-card'

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss'],
})
export class CompanyCardComponent implements OnInit {
  @Input() card: any

  constructor(private modalService: NgxModalService) {}

  openModal() {
    let modal = this.modalService.open(CompanyEditComponent).subscribe()
  }
  ngOnInit(): void {}
}
