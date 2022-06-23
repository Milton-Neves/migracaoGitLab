import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ModulesRoutingModule } from './modules-routing.module'
import { ModulesComponent } from './modules.component'
import { SharedModule } from '@shared/shared.module'
import { ModuleComponent } from './components/module/module.component'

@NgModule({
  declarations: [ModulesComponent, ModuleComponent],
  imports: [CommonModule, ModulesRoutingModule, SharedModule],
})
export class ModulesModule {}
