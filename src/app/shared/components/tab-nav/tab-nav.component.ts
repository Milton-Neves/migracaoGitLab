import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-tab-nav',
  templateUrl: './tab-nav.component.html',
  styleUrls: ['./tab-nav.component.scss'],
})
export class TabNavComponent implements OnInit {
  @Input() titles: string[] = []
  @Output() activeTab: EventEmitter<any> = new EventEmitter()
  id!: string
  constructor() {}

  ngOnInit(): void {
    this.id = this.titles[0]
    this.activeTab.emit(this.id)
  }

  tabChange(ids: any) {
    this.id = ids
    this.activeTab.emit(ids)
  }
}
