import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.scss'],
})
export class CompanyViewComponent implements OnInit {
  texto = 'nome fantasia'
  constructor(private modalService: NgxModalService, private router: Router) {}

  closeModalCompanyView() {
    this.modalService.close()
  }

  ngOnInit(): void {}
}
