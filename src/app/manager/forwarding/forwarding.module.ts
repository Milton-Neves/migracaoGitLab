import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ForwardingRoutingModule } from './forwarding-routing.module'
import { ForwardingComponent } from './forwarding.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { ForwardingCardComponent } from './components/forwarding-card/forwarding-card.component'

@NgModule({
  declarations: [ForwardingComponent, ForwardingCardComponent],
  imports: [CommonModule, ForwardingRoutingModule, SharedModule],
})
export class ForwardingModule {}
