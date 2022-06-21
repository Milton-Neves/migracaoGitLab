import { Component, Input, OnInit } from '@angular/core'

import { NgxModalService } from './../../../../../lib/ngx-modal/src/lib/ngx-modal.service'
import { ForwardingEditComponent } from './../forwarding-edit/forwarding-edit.component'

@Component({
  selector: 'app-forwarding-card',
  templateUrl: './forwarding-card.component.html',
  styleUrls: ['./forwarding-card.component.scss'],
})
export class ForwardingCardComponent implements OnInit {
  @Input() infos: any
  constructor(private modalService: NgxModalService) {}

  editForwarding() {
    let modal = this.modalService.open(ForwardingEditComponent).subscribe()
  }

  ngOnInit(): void {
    this.infos.createdAt = this.infos.createdAt.split(' ')[0]
    this.infos.lastModifiedAt = this.infos.lastModifiedAt.split(' ')[0]
  }
}
