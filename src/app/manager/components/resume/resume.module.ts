import { PaginationNumberComponent } from './../../../shared/components/pagination-number/pagination-number.component'
import { TableComponent } from './../../../shared/components/table/table.component'
import { PaginationComponent } from './../../../shared/components/pagination/pagination.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ResumeRoutingModule } from './resume-routing.module'
import { ResumeComponent } from './resume.component'
import { ActiveResumeListComponent } from './active-resume-list/active-resume-list.component'

@NgModule({
  declarations: [ResumeComponent, ActiveResumeListComponent],
  imports: [CommonModule, ResumeRoutingModule, SharedModule],
  exports: [PaginationComponent, TableComponent, PaginationNumberComponent],
})
export class ResumeModule {}
