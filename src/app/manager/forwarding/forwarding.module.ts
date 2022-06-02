import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SharedModule } from '@shared/shared.module'
import { NgxForwardingModalModule } from 'lib/forwarding-modal/src/public-api'
import { NgxMaskModule } from 'ngx-mask'

import { ForwardingCardComponent } from './components/forwarding-card/forwarding-card.component'
import { ForwardingRoutingModule } from './forwarding-routing.module'
import { ForwardingComponent } from './forwarding.component'

@NgModule({
  declarations: [ForwardingComponent, ForwardingCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ForwardingRoutingModule,
    NgxForwardingModalModule,
    SharedModule,
    NgxMaskModule.forChild(),
  ],
})
export class ForwardingModule {}
