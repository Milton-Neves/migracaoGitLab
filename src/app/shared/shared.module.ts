import { PageTitleComponent } from './components/page-title/page-title.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PaginationComponent } from './components/pagination/pagination.component'
import { ButtonComponent } from './components/button/button.component'

@NgModule({
  declarations: [PaginationComponent, PageTitleComponent],
  imports: [CommonModule],
  exports: [PageTitleComponent],
})
export class SharedModule {}
