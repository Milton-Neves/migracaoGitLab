import { LayoutComponent } from './../../core/components/layout/layout.component'
import { CoreModule } from './../../core/core.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'

import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'
import { SharedModule } from 'src/app/shared/shared.module'

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, HttpClientModule, SharedModule],
})
export class HomeModule {}
