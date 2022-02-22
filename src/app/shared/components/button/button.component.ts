import { Component, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text = ''
  @Input() color = ''
  //@Input() disabled = ''; ESTUDAR
  //@Output() handleClick = ''; ESTUDAR

  constructor() {}

  ngOnInit(): void {}
}
