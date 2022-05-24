import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { JobsRoutingModule } from './jobs-routing.module'
import { JobsComponent } from './jobs.component'
import { JobsEditComponent } from './components/jobs-edit/jobs-edit.component'
import { SharedModule } from '@shared/shared.module'

@NgModule({
  declarations: [JobsComponent, JobsEditComponent],
  imports: [CommonModule, JobsRoutingModule, SharedModule],
})
export class JobsModule {}
