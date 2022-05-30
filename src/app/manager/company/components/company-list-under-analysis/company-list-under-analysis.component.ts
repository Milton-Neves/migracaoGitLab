import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'tr[app-company-list-under-analysis]',
  templateUrl: './company-list-under-analysis.component.html',
  styleUrls: ['./company-list-under-analysis.component.scss'],
})
export class CompanyListUnderAnalysisComponent implements OnInit {
  @Input() company!: any
  constructor() {}

  ngOnInit(): void {}
}
