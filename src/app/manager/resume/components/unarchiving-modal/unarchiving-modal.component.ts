import { Component, Input, OnInit } from '@angular/core'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { tap } from 'rxjs/operators'

import { ResumeService } from '../../services/resume.service'

@Component({
  selector: 'app-unarchiving-modal',
  templateUrl: './unarchiving-modal.component.html',
  styleUrls: ['./unarchiving-modal.component.scss'],
})
export class UnarchivingModalComponent implements OnInit {
  @Input() resumeId!: number
  constructor(
    private modalService: NgxModalService,
    private resumeService: ResumeService
  ) {}

  closeModalUnarchiving() {
    this.modalService.close()
  }

  unarchiveResume() {
    this.resumeService
      .unarchivingResume(this.resumeId)
      .pipe(tap(() => this.closeModalUnarchiving()))
      .subscribe()
  }

  ngOnInit(): void {}
}
