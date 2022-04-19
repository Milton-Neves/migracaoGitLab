import { UserModalComponent } from './components/user-modal/user-modal.component'
import { ResetPasswordComponent } from './components/reset-password/reset-password.component'
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
  openUserModal() {
    let modal = this.modalService.open(UserModalComponent).subscribe()
  }
  ngOnInit(): void {}
}
