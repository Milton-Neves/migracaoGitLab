import { NgxModalService } from './../../../../../lib/ngx-modal/src/lib/ngx-modal.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
  styleUrls: ['./reset-email.component.scss'],
})
export class ResetEmailComponent implements OnInit {
  constructor(private modalService: NgxModalService) {}
  closeModalEmail() {
    this.modalService.close()
  }

  ngOnInit(): void {}
}
