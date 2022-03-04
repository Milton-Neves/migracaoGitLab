import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text?: string
  @Input() textColor?: string = '#FFFFFF'
  @Input() color!: string
  @Input() disabled: boolean = false
  @Output() handleClick = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}

  onHandleClick($event: any) {
    this.handleClick.emit($event)
  }
}
