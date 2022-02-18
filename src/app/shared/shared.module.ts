import { AnalyticCardComponent } from './../manager/home/components/analytic-card/analytic-card.component'
import { PageTitleComponent } from './components/page-title/page-title.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PaginationComponent } from './components/pagination/pagination.component'

@NgModule({
  declarations: [
    PaginationComponent,
    PageTitleComponent,
    AnalyticCardComponent,
  ],
  imports: [CommonModule],
  exports: [PageTitleComponent, AnalyticCardComponent],
})
export class SharedModule {}
