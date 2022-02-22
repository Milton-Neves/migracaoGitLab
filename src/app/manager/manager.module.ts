import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ResumeModule } from './components/resume/resume.module'

import { ManagerRoutingModule } from './manager-routing.module'
import { ManagerComponent } from './manager.component'
import { CoreModule } from '../core/core.module'

@NgModule({
  declarations: [ManagerComponent],
  imports: [CommonModule, ManagerRoutingModule, CoreModule, ResumeModule],
})
export class ManagerModule {}
