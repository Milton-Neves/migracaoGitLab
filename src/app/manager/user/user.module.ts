import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '@shared/shared.module'
import { UserComponent } from './user.component'
import { UserRoutingModule } from './user-routing.module'
import { UsersListComponent } from './components/users-list/users-list.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'

@NgModule({
  declarations: [UserComponent, UsersListComponent, ResetPasswordComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
