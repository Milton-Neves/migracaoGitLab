import { JobsRegistrationComponent } from './components/jobs-registration/jobs-registration.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { JobsComponent } from './jobs.component'

const routes: Routes = [
  {
    path: '',
    component: JobsComponent,
  },
  {
    path: 'cadastrar',
    component: JobsRegistrationComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
