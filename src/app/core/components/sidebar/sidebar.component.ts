import { Component } from '@angular/core'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isOpen = false

  constructor() {}

  toggleMenu() {
    this.isOpen = !this.isOpen
  }
}
