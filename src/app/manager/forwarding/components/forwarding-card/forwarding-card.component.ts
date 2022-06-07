import { Component, OnInit } from '@angular/core'
import { NgxForwardingModalComponent } from 'lib/forwarding-modal/src/public-api'

import { NgxModalService } from './../../../../../lib/ngx-modal/src/lib/ngx-modal.service'

@Component({
  selector: 'app-forwarding-card',
  templateUrl: './forwarding-card.component.html',
  styleUrls: ['./forwarding-card.component.scss'],
})
export class ForwardingCardComponent implements OnInit {
  career = 'professor'
  title = 'Nome da Empresa'

  constructor(private modalService: NgxModalService) {}

  editForwarding() {
    let modal = this.modalService
      .open(NgxForwardingModalComponent, {
        colorCode: '#65fa5a',
        id: '20220600009',
      })
      .subscribe()
  }

  ngOnInit(): void {}
}
