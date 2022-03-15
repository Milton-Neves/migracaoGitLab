import { NgxModalService } from './../../../../../lib/ngx-modal/src/lib/ngx-modal.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-forwarding-edit',
  templateUrl: './forwarding-edit.component.html',
  styleUrls: ['./forwarding-edit.component.scss'],
})
export class ForwardingEditComponent implements OnInit {
  constructor(private modalService: NgxModalService) {}

  closeModal() {
    this.modalService.close()
  }

  ngOnInit(): void {}
}
