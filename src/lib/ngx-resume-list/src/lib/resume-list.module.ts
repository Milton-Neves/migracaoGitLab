import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '@shared/shared.module'
import { NgxFilteringModule } from 'lib/ngx-filtering/src/public-api'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader'

import { ConfirmationForwardingModalComponent } from '../@modal/confirmation-forwarding-modal/confirmation-forwarding-modal.component'
import { NgxResumeListComponent } from './resume-list.component'

@NgModule({
  declarations: [NgxResumeListComponent, ConfirmationForwardingModalComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    CommonModule,
    SharedModule,
    NgxFilteringModule,
  ],
  exports: [NgxResumeListComponent],
})
export class NgxResumeListModule {}
