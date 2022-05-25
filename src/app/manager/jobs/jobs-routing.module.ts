import { JobsRegistrationComponent } from './components/jobs-registration/jobs-registration.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { JobsComponent } from './jobs.component'
import { JobsEditComponent } from './components/jobs-edit/jobs-edit.component'
import { JobsListComponent } from './components/jobs-list/jobs-list.component'

const routes: Routes = [
  {
    path: '',
    component: JobsComponent,
    children: [
      {
        path: '',
        component: JobsListComponent,
      },
      {
        path: 'cadastrar',
        component: JobsRegistrationComponent,
      },
      {
        path: 'editar/:id',
        component: JobsEditComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
