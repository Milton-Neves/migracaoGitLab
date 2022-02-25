import { Component, HostListener } from '@angular/core'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isOpen = false

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let width = event.target.innerWidth
    this.isOpen = width >= 670
  }

  constructor() {}

  toggleMenu() {
    this.isOpen = !this.isOpen
  }
}
