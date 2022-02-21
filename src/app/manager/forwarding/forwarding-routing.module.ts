import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ForwardingComponent } from './forwarding.component'

const routes: Routes = [
  {
    path: '',
    component: ForwardingComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForwardingRoutingModule {}
