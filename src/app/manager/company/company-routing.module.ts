import { CompanyEditComponent } from './components/company-edit/company-edit.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CompanyComponent } from './company.component'

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
