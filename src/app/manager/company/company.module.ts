import { CompanyViewComponent } from './components/company-view/company-view.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '@shared/shared.module'
import { CompanyRoutingModule } from './company-routing.module'
import { CompanyComponent } from './company.component'
import { CompanyCardComponent } from './components/company-card/company-card.component'
import { CompanyEditComponent } from './components/company-edit/company-edit.component'
import { CompanyRemovalConfirmationComponent } from './components/company-removal-confirmation/company-removal-confirmation.component'

@NgModule({
  declarations: [
    CompanyComponent,
    CompanyCardComponent,
    CompanyViewComponent,
    CompanyEditComponent,
    CompanyRemovalConfirmationComponent,
  ],
  imports: [CommonModule, CompanyRoutingModule, SharedModule],
})
export class CompanyModule {}
