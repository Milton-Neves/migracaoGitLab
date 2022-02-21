import { PageTitleComponent } from './components/page-title/page-title.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PaginationComponent } from './components/pagination/pagination.component'
import { InformationCardComponent } from './components/information-card/information-card.component'
import { TableComponent } from './components/table/table.component'
import { PaginationNumberComponent } from './components/pagination-number/pagination-number.component'

const components = [
  PaginationComponent,
  PageTitleComponent,
  InformationCardComponent,
  TableComponent,
  PaginationNumberComponent,
]

@NgModule({
  declarations: components,
  imports: [CommonModule],
  exports: components,
})
export class SharedModule {}
