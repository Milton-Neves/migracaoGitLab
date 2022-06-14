import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-physical-user-list',
  templateUrl: './physical-user-list.component.html',
  styleUrls: ['./physical-user-list.component.scss'],
})
export class PhysicalUserListComponent implements OnInit {
  tableColumns = ['Nome', 'CPF', 'Ações']
  constructor() {}

  ngOnInit(): void {}
}
