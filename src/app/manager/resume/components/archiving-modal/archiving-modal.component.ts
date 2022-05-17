import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-archiving-modal',
  templateUrl: './archiving-modal.component.html',
  styleUrls: ['./archiving-modal.component.scss'],
})
export class ArchivingModalComponent implements OnInit {
  constructor(private modalService: NgxModalService) {}

  closeModalArchiving() {
    this.modalService.close()
  }

  ngOnInit(): void {}
}
