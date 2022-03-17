import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '@shared/shared.module'
import { UserComponent } from './user.component'
import { UserRoutingModule } from './user-routing.module'
import { UsersListComponent } from './components/users-list/users-list.component'

@NgModule({
  declarations: [UserComponent, UsersListComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
