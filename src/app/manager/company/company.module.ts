import { CompanyViewComponent } from './components/company-view/company-view.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '@shared/shared.module'
import { CompanyRoutingModule } from './company-routing.module'
import { CompanyComponent } from './company.component'
import { CompanyCardComponent } from './components/company-card/company-card.component'
import { CompanyEditComponent } from './components/company-edit/company-edit.component'
import { ActiveCompanyListComponent } from './components/active-company-list/active-company-list.component'
import { HttpClient, HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    CompanyComponent,
    CompanyCardComponent,
    CompanyViewComponent,
    CompanyEditComponent,
    ActiveCompanyListComponent,
  ],
  imports: [CommonModule, CompanyRoutingModule, SharedModule],
})
export class CompanyModule {}
