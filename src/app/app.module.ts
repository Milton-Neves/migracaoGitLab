import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { SharedModule } from '@shared/shared.module'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ResumeViewComponent } from './resume-view/resume-view.component'
import { JobListModalComponent } from './job-list-modal/job-list-modal.component'

@NgModule({
  declarations: [AppComponent, ResumeViewComponent, JobListModalComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
