import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss'],
})
export class CompanyEditComponent implements OnInit {
  title = 'Rayanni Modas'
  career = 'vestuário'

  sectionTitle = ['Dados', 'Contato', 'Endereço', 'Representante']
  activeTab?: string
  constructor(private modalService: NgxModalService) {}

  changeTab(tab: any) {
    this.activeTab = tab
  }
  closeModal() {
    this.modalService.close()
  }

  ngOnInit(): void {
    this.activeTab = this.sectionTitle[0]
  }
}
