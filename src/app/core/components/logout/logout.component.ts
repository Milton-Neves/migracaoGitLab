import { Component } from '@angular/core'

import { LoginService } from 'app/login/services/login.service'
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(private loginService: LoginService) {}

  logout(): void {
    this.loginService.logout()
  }
}
