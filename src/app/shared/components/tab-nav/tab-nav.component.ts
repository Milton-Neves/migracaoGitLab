import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-tab-nav',
  templateUrl: './tab-nav.component.html',
  styleUrls: ['./tab-nav.component.scss'],
})
export class TabNavComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  id: any = 'active'
  tabChange(ids: any) {
    this.id = ids
    console.log(this.id)
  }
}
