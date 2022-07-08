import { Component, OnInit } from '@angular/core'
import { Module } from './components/module/module.component'

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
})
export class ModulesComponent implements OnInit {
  modules: Module[] = [
    {
      id: 1,
      title: 'Curriculos',
      status: true,
    },
    {
      id: 2,
      title: 'Empresas',
      status: true,
    },
    {
      id: 3,
      title: 'Relatorio',
      status: true,
    },
    {
      id: 4,
      title: 'Cargos',
      status: true,
    },
    {
      id: 5,
      title: 'Encaminhamentos',
      status: true,
    },
    {
      id: 6,
      title: 'Usuários',
      status: true,
    },
  ]

  constructor() {}

  ngOnInit(): void {}

  onChange(event: any) {
    console.log(event)
  }
}
