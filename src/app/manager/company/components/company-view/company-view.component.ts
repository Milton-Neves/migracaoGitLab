import { CompanyEditComponent } from './../company-edit/company-edit.component'
import { Component, OnInit } from '@angular/core'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.scss'],
})
export class CompanyViewComponent implements OnInit {
  texto = 'nome fantasia'
  constructor(private modalService: NgxModalService) {}

  closeModal() {
    this.modalService.close()
  }
  // navigateToCompanyEdit() {
  //   this.router.navigate('/company-edit')
  // }

  ngOnInit(): void {}
}
