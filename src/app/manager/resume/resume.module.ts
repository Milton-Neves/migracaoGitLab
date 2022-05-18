import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from '@shared/shared.module'

import { ActiveResumeListComponent } from './components/active-resume-list/active-resume-list.component'
import { ArchivedResumeListComponent } from './components/archived-resume-list/archived-resume-list.component'
import { ResumeViewComponent } from './components/resume-view/resume-view.component'
import { ResumeRoutingModule } from './resume-routing.module'
import { ResumeComponent } from './resume.component'
import { ResumeJobsViewComponent } from './components/resume-jobs-view/resume-jobs-view.component'
import { NgxMaskModule, IConfig, MaskApplierService } from 'ngx-mask'
import { ProfessionalExperienceComponent } from './components/resume-view/tabs/professional-experience/professional-experience.component'
import { FormationComponent } from './components/resume-view/tabs/formation/formation.component'
import { AvailabilityComponent } from './components/resume-view/tabs/availability/availability.component'
import { AboutComponent } from './components/resume-view/tabs/about/about.component'
import { ArchivingModalComponent } from './components/archiving-modal/archiving-modal.component'
import { JobListModalComponent } from './components/job-list-modal/job-list-modal.component'

const maskConfig: Partial<IConfig> = {
  validation: false,
}

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
  ],
  imports: [
    CommonModule,
    ResumeRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [MaskApplierService],
})
export class ResumeModule {}
