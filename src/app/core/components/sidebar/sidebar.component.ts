import { Component, HostListener, OnInit } from '@angular/core'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isOpen = true

  constructor() {}

  ngOnInit(): void {
    this.resize(document.body.clientWidth)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width = event.target.innerWidth
    this.resize(width)
  }

  toggleMenu() {
    this.isOpen = !this.isOpen
  }

  resize(width: number) {
    this.isOpen = width >= 1020
  }
}
