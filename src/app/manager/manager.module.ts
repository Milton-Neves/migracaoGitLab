import { CompanyModule } from './company/company.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ManagerRoutingModule } from './manager-routing.module'
import { ManagerComponent } from './manager.component'
import { CoreModule } from '../core/core.module'

@NgModule({
  declarations: [ManagerComponent],
  imports: [CommonModule, ManagerRoutingModule, CoreModule, CompanyModule],
})
export class ManagerModule {}
