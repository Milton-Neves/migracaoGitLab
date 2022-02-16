import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PaginationComponent } from './components/pagination/pagination.component'
import { ButtonComponent } from './components/button/button.component'

@NgModule({
  declarations: [PaginationComponent, ButtonComponent],
  imports: [CommonModule],
})
export class SharedModule {}
