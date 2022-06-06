import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxFilteringModule } from 'lib/ngx-filtering/src/public-api'
import { IConfig, NgxMaskModule } from 'ngx-mask'

import { AnalyticCardComponent } from './../manager/home/components/analytic-card/analytic-card.component'
import { ButtonComponent } from './components/button/button.component'
import { ExpiresTokenWarningComponent } from './components/expires-token-warning/expires-token-warning.component'
import { InformationCardComponent } from './components/information-card/information-card.component'
import { InputSearchComponent } from './components/input-search/input-search.component'
import { NotAllowedComponent } from './components/not-allowed/not-allowed.component'
import { PageTitleComponent } from './components/page-title/page-title.component'
import { PaginationNumberComponent } from './components/pagination-number/pagination-number.component'
import { PaginationComponent } from './components/pagination/pagination.component'
import { TabNavComponent } from './components/tab-nav/tab-nav.component'
import { TableComponent } from './components/table/table.component'
import { HighlightDirective } from './directives/highlight.directive'
import { DashOnNullPipe } from './pipes/dash-on-null.pipe'
import { ReplaceUnderlineToSpacePipe } from './pipes/replace-with-regex'

const maskConfig: Partial<IConfig> = {
  validation: false,
}

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
  InputSearchComponent,
  DashOnNullPipe,
  ExpiresTokenWarningComponent,
  ReplaceUnderlineToSpacePipe,
  NotAllowedComponent,
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  exports: [components, FormsModule, NgxMaskModule, NgxFilteringModule],
})
export class SharedModule {}
