import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ResumeRoutingModule } from './resume-routing.module'
import { ResumeComponent } from './resume.component'
import { ActiveResumeListComponent } from './components/active-resume-list/active-resume-list.component'
import { ArchivedResumeListComponent } from './components/archived-resume-list/archived-resume-list.component'
import { SharedModule } from '@shared/shared.module'

@NgModule({
  declarations: [
    ResumeComponent,
    ActiveResumeListComponent,
    ArchivedResumeListComponent,
  ],
  imports: [CommonModule, ResumeRoutingModule, SharedModule],
})
export class ResumeModule {}
