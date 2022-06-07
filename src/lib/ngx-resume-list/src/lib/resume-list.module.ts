import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '@shared/shared.module'
import { NgxFilteringModule } from 'lib/ngx-filtering/src/public-api'

import { NgxResumeListComponent } from './resume-list.component'

@NgModule({
  declarations: [NgxResumeListComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    NgxFilteringModule,
  ],
  exports: [NgxResumeListComponent],
})
export class NgxResumeListModule {}
