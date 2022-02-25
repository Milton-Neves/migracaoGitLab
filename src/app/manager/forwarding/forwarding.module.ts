import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ForwardingRoutingModule } from './forwarding-routing.module'
import { ForwardingComponent } from './forwarding.component'
import { SharedModule } from '@shared/shared.module'

@NgModule({
  declarations: [ForwardingComponent],
  imports: [CommonModule, ForwardingRoutingModule, SharedModule],
})
export class ForwardingModule {}
