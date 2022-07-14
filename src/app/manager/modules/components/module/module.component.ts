import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ModulesService } from '../../services/modules.service'

export interface Module {
  title: string
  status: boolean
  id: any
}

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss'],
})
export class ModuleComponent implements OnInit {
  @Input() module!: Module
  @Output() onChangeEvent = new EventEmitter()

  constructor(private modulesService: ModulesService) {}

  ngOnInit(): void {
    this.modulesService.findAll().subscribe(console.log)
  }

  onChange(event: any) {
    this.onChangeEvent.emit(console.log)
    console.log(this.module)
  }
}
