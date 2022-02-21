import { Component, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  num = 100
  text = 'pessoas conectadas'
  num2 = 100
  text2 = 'total de currículos'
  num3 = 40
  text3 = 'pessoas cadastradas'
  num4 = 28
  text4 = 'total de encaminhamentos'
  constructor() {}

  ngOnInit(): void {}
}
