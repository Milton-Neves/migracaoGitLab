import { Component, OnInit } from '@angular/core'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'

@Component({
  selector: 'app-resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.scss'],
})
export class ResumeViewComponent implements OnInit {
  sectionTitle = [
    'Dados',
    'Disponibilidade',
    'Formação',
    'Experiência Profissional',
  ]
  activeTab?: string

  constructor(private modalService: NgxModalService) {}

  changeTab(tab: any) {
    this.activeTab = tab
    console.log(this.activeTab)
  }

  closeModal() {
    this.modalService.close()
  }

  ngOnInit(): void {
    this.activeTab = this.sectionTitle[0]
  }
}
