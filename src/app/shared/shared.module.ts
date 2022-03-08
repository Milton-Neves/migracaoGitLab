import { AnalyticCardComponent } from './../manager/home/components/analytic-card/analytic-card.component'
import { PageTitleComponent } from './components/page-title/page-title.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PaginationComponent } from './components/pagination/pagination.component'
import { InformationCardComponent } from './components/information-card/information-card.component'
import { TableComponent } from './components/table/table.component'
import { PaginationNumberComponent } from './components/pagination-number/pagination-number.component'
import { ButtonComponent } from './components/button/button.component'
import { TabNavComponent } from './components/tab-nav/tab-nav.component'

const components = [
  PaginationComponent,
  PageTitleComponent,
  InformationCardComponent,
  TableComponent,
  PaginationNumberComponent,
  AnalyticCardComponent,
  ButtonComponent,
  TabNavComponent,
]

@NgModule({
  declarations: components,
  imports: [CommonModule],
  exports: components,
})
export class SharedModule {}
