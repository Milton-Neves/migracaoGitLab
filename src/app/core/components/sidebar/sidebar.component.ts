import { Component, HostListener } from '@angular/core'

import { MODULES, SidebarModule } from '@shared/constants/modules'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isOpen = false
  modules: SidebarModule[] = MODULES

  constructor() {}

  toggleMenu() {
    this.isOpen = !this.isOpen
  }
}
