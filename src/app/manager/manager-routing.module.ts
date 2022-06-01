import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotAllowedComponent } from '@shared/components/not-allowed/not-allowed.component'

import { FeatureFlagGuard } from '../login/guards/feature-flag.guard'
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
        canLoad: [FeatureFlagGuard],
        data: {
          feature: 'resume',
        },
      },

      {
        path: 'empresas',
        loadChildren: () =>
          import('./company/company.module').then((m) => m.CompanyModule),
        canLoad: [FeatureFlagGuard],
        data: {
          feature: 'legalUser',
        },
      },

      {
        path: 'encaminhamentos',
        loadChildren: () =>
          import('./forwarding/forwarding.module').then(
            (m) => m.ForwardingModule
          ),
        canLoad: [FeatureFlagGuard],
        data: {
          feature: 'forwarding',
        },
      },

      {
        path: 'cargos',
        loadChildren: () =>
          import('./jobs/jobs.module').then((m) => m.JobsModule),
        canLoad: [FeatureFlagGuard],
        data: {
          feature: 'workField',
        },
      },

      {
        path: 'relatorios',
        loadChildren: () =>
          import('./report/report.module').then((m) => m.ReportModule),
        canLoad: [FeatureFlagGuard],
        data: {
          feature: 'report',
        },
      },

      {
        path: 'usuarios',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'funcionalidade-desativada',
        component: NotAllowedComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
