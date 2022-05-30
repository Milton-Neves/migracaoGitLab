import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { JobsRoutingModule } from './jobs-routing.module'
import { JobsComponent } from './jobs.component'

import { JobsEditComponent } from './components/jobs-edit/jobs-edit.component'
import { SharedModule } from '@shared/shared.module'
import { JobsRegistrationComponent } from './components/jobs-registration/jobs-registration.component'
import { JobsListComponent } from './components/jobs-list/jobs-list.component'

@NgModule({
  declarations: [
    JobsComponent,
    JobsEditComponent,
    JobsRegistrationComponent,
    JobsListComponent,
  ],

  imports: [CommonModule, JobsRoutingModule, SharedModule],
})
export class JobsModule {}
