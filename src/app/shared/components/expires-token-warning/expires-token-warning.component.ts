import { Component, Input, OnInit } from '@angular/core'
import { LoginService } from 'app/login/services/login.service'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'

@Component({
  selector: 'app-expires-token-warning',
  templateUrl: './expires-token-warning.component.html',
  styleUrls: ['./expires-token-warning.component.scss'],
})
export class ExpiresTokenWarningComponent implements OnInit {
  @Input() leftTimeDate!: string
  @Input() currentMinuteLeft!: number
  interval: any
  leftTime: {
    expiresHours: number
    expiresMinutes: number
    expiresSeconds: number
  } = this.loginService.calculateExpiresDate(new Date(this.leftTimeDate))

  constructor(
    private loginService: LoginService,
    private modalService: NgxModalService
  ) {}

  closeModal() {
    clearInterval(this.interval)
    this.modalService.close()
  }

  closeModalAndLogOut() {
    clearInterval(this.interval)
    this.modalService.close()
    this.loginService.logout()
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.currentMinuteLeft = this.loginService.calculateExpiresDate(
        new Date(this.leftTimeDate)
      ).expiresMinutes
    }, 1000 * 60)
  }

  ngOnInit(): void {
    this.startTimer()
  }
}
