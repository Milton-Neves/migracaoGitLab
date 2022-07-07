import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  focusOne: boolean = false
  focusTwo: boolean = false
  @Input() text?: string
  @Input() textColor?: string = '#FFFFFF'
  @Input() color!: string
  @Input() disabled: boolean = false
  @Output() handleClick = new EventEmitter()
  @Input() type = 'button'

  constructor() {}

  ngOnInit(): void {}

  onHandleClick($event: any) {
    this.handleClick.emit($event)
  }
}
