import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { FilteringComponent } from './@components/filtering/filtering.component'
import { NgxFilteringComponent } from './ngx-filtering.component'

@NgModule({
  declarations: [NgxFilteringComponent, FilteringComponent],
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  exports: [NgxFilteringComponent],
})
export class NgxFilteringModule {}
