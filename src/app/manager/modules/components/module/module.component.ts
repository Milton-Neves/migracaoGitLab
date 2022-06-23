import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

export interface Module {
  title: string
  status: boolean
  id: any
}

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss'],
})
export class ModuleComponent implements OnInit {
  @Input() module!: Module
  @Output() onChangeEvent = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}

  onChange(event: any) {
    this.onChangeEvent.emit()
  }
}
