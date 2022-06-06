import { Component } from '@angular/core'
import { MODULES, SidebarModule } from '@shared/constants/modules'
import { LoginService } from 'app/login/services/login.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isOpen = false
  modules: SidebarModule[] = MODULES

  constructor(private loginService: LoginService) {}

  toggleMenu() {
    this.isOpen = !this.isOpen
  }

  verifyPermissions(roles: string[]) {
    return this.loginService.verifyPermissions(roles)
  }
}
