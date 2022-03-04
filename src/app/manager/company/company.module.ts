import { CompanyViewComponent } from './components/company-view/company-view.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '@shared/shared.module'
import { CompanyRoutingModule } from './company-routing.module'
import { CompanyComponent } from './company.component'
import { CompanyCardComponent } from './components/company-card/company-card.component'

@NgModule({
  declarations: [CompanyComponent, CompanyCardComponent, CompanyViewComponent],
  imports: [CommonModule, CompanyRoutingModule, SharedModule],
})
export class CompanyModule {}
