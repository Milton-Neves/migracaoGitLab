import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CompanyRoutingModule } from './company-routing.module'
import { CompanyComponent } from './company.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { CompanyCardComponent } from './components/company-card/company-card.component'

@NgModule({
  declarations: [CompanyComponent, CompanyCardComponent],
  imports: [CommonModule, CompanyRoutingModule, SharedModule],
})
export class CompanyModule {}
