import { ForwardingEditComponent } from './../forwarding-edit/forwarding-edit.component'
import { NgxModalService } from './../../../../../lib/ngx-modal/src/lib/ngx-modal.service'
import { Component, OnInit } from '@angular/core'

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
    let modal = this.modalService.open(ForwardingEditComponent).subscribe()
  }

  ngOnInit(): void {}
}
