import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-active-company-list',
  templateUrl: './active-company-list.component.html',
  styleUrls: ['./active-company-list.component.scss'],
})
export class ActiveCompanyListComponent implements OnInit {
  @Input() companies: any[] = []

  constructor() {}

  ngOnInit(): void {}
}
