import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SharedModule } from '@shared/shared.module'
import { MaskApplierService } from 'ngx-mask'

import { ActiveResumeListComponent } from './components/active-resume-list/active-resume-list.component'
import { ArchivedResumeListComponent } from './components/archived-resume-list/archived-resume-list.component'
import { ArchivingModalComponent } from './components/archiving-modal/archiving-modal.component'
import { JobListModalComponent } from './components/job-list-modal/job-list-modal.component'
import { ResumeJobsViewComponent } from './components/resume-jobs-view/resume-jobs-view.component'
import { ResumeViewComponent } from './components/resume-view/resume-view.component'
import { AboutComponent } from './components/resume-view/tabs/about/about.component'
import { AvailabilityComponent } from './components/resume-view/tabs/availability/availability.component'
import { FormationComponent } from './components/resume-view/tabs/formation/formation.component'
import { ProfessionalExperienceComponent } from './components/resume-view/tabs/professional-experience/professional-experience.component'
import { UnarchivingModalComponent } from './components/unarchiving-modal/unarchiving-modal.component'
import { ResumeRoutingModule } from './resume-routing.module'
import { ResumeComponent } from './resume.component'

@NgModule({
  declarations: [
    ResumeComponent,
    ActiveResumeListComponent,
    ArchivedResumeListComponent,
    ResumeViewComponent,
    ResumeJobsViewComponent,
    ProfessionalExperienceComponent,
    FormationComponent,
    AvailabilityComponent,
    AboutComponent,
    ArchivingModalComponent,
    JobListModalComponent,
    UnarchivingModalComponent,
  ],
  imports: [CommonModule, ResumeRoutingModule, FormsModule, SharedModule],
  providers: [MaskApplierService],
})
export class ResumeModule {}
