import { Component } from '@angular/core'

@Component({
  selector: 'app-manager',
  template: `
    <app-layout>
      <router-outlet></router-outlet>
    </app-layout>
  `,
})
export class ManagerComponent {
  constructor() {}
}
