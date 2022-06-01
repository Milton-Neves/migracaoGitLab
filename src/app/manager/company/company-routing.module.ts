import { CompanyRegistrationComponent } from './components/company-registration/company-registration.component'
import { CompanyCardComponent } from './components/company-card/company-card.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CompanyComponent } from './company.component'

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
  },
  {
    path: 'cadastrar',
    component: CompanyRegistrationComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
