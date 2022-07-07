import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { NgxForwardingModalComponent } from 'lib/forwarding-modal/src/public-api'
import { switchMap } from 'rxjs/operators'

import { NgxModalService } from './../../../../../lib/ngx-modal/src/lib/ngx-modal.service'

@Component({
  selector: 'app-forwarding-card',
  templateUrl: './forwarding-card.component.html',
  styleUrls: ['./forwarding-card.component.scss'],
})
export class ForwardingCardComponent implements OnInit {
  @Input() infos: any
  @Input() workfield: any
  @Output() refresh = new EventEmitter<boolean>()
  constructor(private modalService: NgxModalService) {}

  editForwarding() {
    let modal = this.modalService
      .open(
        NgxForwardingModalComponent,
        {
          colorCode: this.workfield.selectedColor,
          id: this.infos.id,
        },
        { ignoreBackClick: true }
      )
      .pipe(switchMap((res) => res.onClose))
      .subscribe((res) => this.refresh.emit(true))
  }

  ngOnInit(): void {
    this.infos.createdAt = this.infos.createdAt.split(' ')[0]
    this.infos.finishedAt = this.infos.finishedAt.split(' ')[0]
  }
}
