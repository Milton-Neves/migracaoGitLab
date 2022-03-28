import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() adittionalColumn?: string[]
  routesWithTables = [
    '/gerenciador/curriculos',
    '/gerenciador/usuarios',
    '/gerenciador/empresas',
  ]
  activedRoute!: string
  constructor(private modalService: NgxModalService, private router: Router) {}

  ngOnInit(): void {
    this.activedRoute = this.router.url
  }
}
