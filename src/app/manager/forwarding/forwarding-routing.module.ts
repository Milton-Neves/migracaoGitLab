import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { NgxResumeListComponent } from './../../../lib/ngx-resume-list/src/lib/resume-list.component'
import { ForwardingComponent } from './forwarding.component'

const routes: Routes = [
  {
    path: '',
    component: ForwardingComponent,
    children: [],
  },
  { path: 'novo', component: NgxResumeListComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForwardingRoutingModule {}
