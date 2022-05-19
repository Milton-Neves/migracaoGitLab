import { Component, OnInit } from '@angular/core'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'

@Component({
  selector: 'app-unarchiving-modal',
  templateUrl: './unarchiving-modal.component.html',
  styleUrls: ['./unarchiving-modal.component.scss'],
})
export class UnarchivingModalComponent implements OnInit {
  constructor(private modalService: NgxModalService) {}

  closeModalUnarchiving() {
    this.modalService.close()
  }
  ngOnInit(): void {}
}
