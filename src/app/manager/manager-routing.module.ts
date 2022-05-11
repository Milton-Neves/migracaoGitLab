import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ManagerComponent } from './manager.component'

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },

      {
        path: 'curriculos',
        loadChildren: () =>
          import('./resume/resume.module').then((m) => m.ResumeModule),
      },

      {
        path: 'empresas',
        loadChildren: () =>
          import('./company/company.module').then((m) => m.CompanyModule),
      },

      {
        path: 'encaminhamentos',
        loadChildren: () =>
          import('./forwarding/forwarding.module').then(
            (m) => m.ForwardingModule
          ),
      },

      {
        path: 'cargos',
        loadChildren: () =>
          import('./jobs/jobs.module').then((m) => m.JobsModule),
      },

      {
        path: 'relatorios',
        loadChildren: () =>
          import('./report/report.module').then((m) => m.ReportModule),
      },

      {
        path: 'usuarios',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
