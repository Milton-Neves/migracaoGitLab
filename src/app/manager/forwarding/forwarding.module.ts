import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ForwardingRoutingModule } from './forwarding-routing.module'
import { ForwardingComponent } from './forwarding.component'

@NgModule({
  declarations: [ForwardingComponent],
  imports: [CommonModule, ForwardingRoutingModule],
})
export class ForwardingModule {}
