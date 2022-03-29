import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { Component, OnInit } from '@angular/core'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private modalService: NgxModalService,
    private http: HttpClient
  ) {}

  openModal() {
    let modal = this.modalService.open(ResetPasswordComponent).subscribe()
  }

  ngOnInit(): void {}
}
