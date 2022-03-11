import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ResumeViewComponent } from 'app/manager/resume/components/resume-view/resume-view.component'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  routes: string[] = ['/gerenciador/curriculos', '/gerenciador/usuarios']
  activedRoute!: string
  @Input() additionalColumn?: string

  constructor(private modalService: NgxModalService, private router: Router) {}

  viewResume() {
    let modal = this.modalService.open(ResumeViewComponent).subscribe()
  }

  ngOnInit(): void {
    this.activedRoute = this.router.url
  }
}
