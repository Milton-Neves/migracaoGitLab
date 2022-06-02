import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SharedModule } from '@shared/shared.module'
import { NgxMaskModule } from 'ngx-mask'

import { NgxForwardingModalComponent } from './forwarding-modal.component'

@NgModule({
  declarations: [NgxForwardingModalComponent],
  imports: [CommonModule, FormsModule, NgxMaskModule.forChild(), SharedModule],
  exports: [NgxForwardingModalComponent],
})
export class NgxForwardingModalModule {}
