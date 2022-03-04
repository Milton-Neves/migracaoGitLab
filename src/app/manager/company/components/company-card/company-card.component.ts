import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss'],
})
export class CompanyCardComponent implements OnInit {
  title = 'Rayanni Modas'
  career = 'vestuário'

  constructor() {}

  ngOnInit(): void {}
}
