import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from '@shared/shared.module'
import { NgxMaskModule } from 'ngx-mask'

import { CompanyRoutingModule } from './company-routing.module'
import { CompanyComponent } from './company.component'
import { CompanyCardComponent } from './components/company-card/company-card.component'
import { CompanyEditComponent } from './components/company-edit/company-edit.component'
import { ActiveCompanyListComponent } from './components/active-company-list/active-company-list.component'
import { CompanyListUnderAnalysisComponent } from './components/company-list-under-analysis/company-list-under-analysis.component'
import { CompanyRegistrationComponent } from './components/company-registration/company-registration.component'
import { CompanyRemovalConfirmationComponent } from './components/company-removal-confirmation/company-removal-confirmation.component'
import { CompanyViewComponent } from './components/company-view/company-view.component'

@NgModule({
  declarations: [
    CompanyComponent,
    CompanyCardComponent,
    CompanyViewComponent,
    CompanyEditComponent,
    ActiveCompanyListComponent,
    CompanyRegistrationComponent,
    CompanyRemovalConfirmationComponent,
    CompanyListUnderAnalysisComponent,
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule,
    NgxMaskModule.forChild(),
  ],
})
export class CompanyModule {}
