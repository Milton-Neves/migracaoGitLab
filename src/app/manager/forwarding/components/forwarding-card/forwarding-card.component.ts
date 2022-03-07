import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-forwarding-card',
  templateUrl: './forwarding-card.component.html',
  styleUrls: ['./forwarding-card.component.scss'],
})
export class ForwardingCardComponent implements OnInit {
  career = 'professor'
  title = 'Nome da Empresa'

  constructor() {}

  ngOnInit(): void {}
}
