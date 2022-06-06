import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PermissionsGuard } from '@core/guards/permissions.guard'
import { NotAllowedComponent } from '@shared/components/not-allowed/not-allowed.component'
import { permissions } from '@shared/constants/permissions'

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
        canActivateChild: [PermissionsGuard],
        canLoad: [FeatureFlagGuard],
        data: {
          feature: 'resume',
          rolesPermission: permissions.homePermissions,
        },
      },

      {
        path: 'empresas',
        loadChildren: () =>
          import('./company/company.module').then((m) => m.CompanyModule),
        canActivateChild: [PermissionsGuard],
        canLoad: [FeatureFlagGuard],
        data: {
          feature: 'legalUser',
          rolesPermission: permissions.companyPermissions,
        },
      },

      {
        path: 'encaminhamentos',
        loadChildren: () =>
          import('./forwarding/forwarding.module').then(
            (m) => m.ForwardingModule
          ),
        canActivateChild: [PermissionsGuard],
        canLoad: [FeatureFlagGuard],
        data: {
          feature: 'forwarding',
          rolesPermission: permissions.forwardingPermissions,
        },
      },

      {
        path: 'cargos',
        loadChildren: () =>
          import('./jobs/jobs.module').then((m) => m.JobsModule),
        canActivateChild: [PermissionsGuard],
        canLoad: [FeatureFlagGuard],
        data: {
          feature: 'workField',
          rolesPermission: permissions.workfieldPermissions,
        },
      },

      {
        path: 'relatorios',
        loadChildren: () =>
          import('./report/report.module').then((m) => m.ReportModule),
        canActivateChild: [PermissionsGuard],
        canLoad: [FeatureFlagGuard],
        data: {
          feature: 'report',
          rolesPermission: permissions.reportPermissions,
        },
      },

      {
        path: 'usuarios',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
        canActivateChild: [PermissionsGuard],
        data: {
          rolesPermission: permissions.usersPermissions,
        },
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
