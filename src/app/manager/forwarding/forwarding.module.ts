import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ForwardingRoutingModule } from './forwarding-routing.module'
import { ForwardingComponent } from './forwarding.component'
import { ForwardingCardComponent } from './components/forwarding-card/forwarding-card.component'
import { ForwardingEditComponent } from './components/forwarding-edit/forwarding-edit.component'
import { SharedModule } from '@shared/shared.module'

@NgModule({
  declarations: [
    ForwardingComponent,
    ForwardingCardComponent,
    ForwardingEditComponent,
  ],
  imports: [CommonModule, ForwardingRoutingModule, SharedModule],
})
export class ForwardingModule {}
