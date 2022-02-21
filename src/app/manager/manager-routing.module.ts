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
        path: 'curriculo',
        loadChildren: () =>
          import('./curriculo/curriculo.module').then((m) => m.CurriculoModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
