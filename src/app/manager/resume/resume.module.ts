import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from '@shared/shared.module'

import { ActiveResumeListComponent } from './components/active-resume-list/active-resume-list.component'
import { ArchivedResumeListComponent } from './components/archived-resume-list/archived-resume-list.component'
import { ResumeViewComponent } from './components/resume-view/resume-view.component'
import { ResumeRoutingModule } from './resume-routing.module'
import { ResumeComponent } from './resume.component'

@NgModule({
  declarations: [
    ResumeComponent,
    ActiveResumeListComponent,
    ArchivedResumeListComponent,
    ResumeViewComponent,
  ],
  imports: [CommonModule, ResumeRoutingModule, SharedModule],
})
export class ResumeModule {}
