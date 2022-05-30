import { Component } from '@angular/core'

import { LoginService } from './login/services/login.service'

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'sgi-banco-de-empregos'

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.restartTime()
  }
}
