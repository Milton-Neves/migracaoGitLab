import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'

import { AnalyticCardComponent } from './../manager/home/components/analytic-card/analytic-card.component'
import { ButtonComponent } from './components/button/button.component'
import { InformationCardComponent } from './components/information-card/information-card.component'
import { PageTitleComponent } from './components/page-title/page-title.component'
import { PaginationNumberComponent } from './components/pagination-number/pagination-number.component'
import { PaginationComponent } from './components/pagination/pagination.component'
import { TabNavComponent } from './components/tab-nav/tab-nav.component'
import { TableComponent } from './components/table/table.component'
import { HighlightDirective } from './directives/highlight.directive'

const components = [
  PaginationComponent,
  PageTitleComponent,
  InformationCardComponent,
  TableComponent,
  PaginationNumberComponent,
  AnalyticCardComponent,
  ButtonComponent,
  HighlightDirective,
  TabNavComponent,
]

@NgModule({
  declarations: components,
  imports: [CommonModule, HttpClientModule],
  exports: components,
})
export class SharedModule {}
