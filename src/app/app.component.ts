import { Component } from '@angular/core'

import { LoginService } from './login/services/login.service'

const EXPIRES_TOKEN: string = 'sgi-banco-de-empregos:expiresTime'
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'sgi-banco-de-empregos'

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    let expiresDate: string | null = sessionStorage.getItem(EXPIRES_TOKEN)
    if (expiresDate != null) {
      this.loginService.startTimer(expiresDate)
    }
  }
}
