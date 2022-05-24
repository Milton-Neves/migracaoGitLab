import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { JobsRoutingModule } from './jobs-routing.module'
import { JobsComponent } from './jobs.component'
import { JobsRegistrationComponent } from './components/jobs-registration/jobs-registration.component'
import { SharedModule } from '@shared/shared.module'

@NgModule({
  declarations: [JobsComponent, JobsRegistrationComponent],
  imports: [CommonModule, JobsRoutingModule, SharedModule],
})
export class JobsModule {}
