import { NgxModalService } from './../../../../../lib/ngx-modal/src/lib/ngx-modal.service'
import { Component, Input, OnInit } from '@angular/core'
import { CompanyEditComponent } from '../company-edit/company-edit.component'
import { Cards } from '@core/interfaces/information-card'
import { title } from 'process'

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss'],
})
export class CompanyCardComponent implements OnInit {
  // title = 'Rayanni Modas'
  // career = 'vestuário'

  cardList: Cards = {
    card: [
      {
        title: 'Rayanni Modas',
        career: 'vestuário',
        stylesInformation: 'string',
        stylesHeader: 'string',
      },
    ],
  }

  constructor(private modalService: NgxModalService) {}

  openModal() {
    let modal = this.modalService.open(CompanyEditComponent).subscribe()
  }

  ngOnInit(): void {}
}
