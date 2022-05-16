import { ResetPasswordComponent } from './components/reset-password/reset-password.component'
import { ResetPasswordUserComponent } from './components/reset-password-user/reset-password-user.component'
import { PatternValidator, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '@shared/shared.module'
import { UserComponent } from './user.component'
import { UserRoutingModule } from './user-routing.module'
import { UsersListComponent } from './components/users-list/users-list.component'
import { UserModalComponent } from './components/user-modal/user-modal.component'
import { ResetEmailComponent } from './components/reset-email/reset-email.component'
import { CitizenModalComponent } from './components/citizen-modal/citizen-modal.component'
@NgModule({
  declarations: [
    UserComponent,
    UsersListComponent,
    UserModalComponent,
    ResetEmailComponent,
    ResetPasswordUserComponent,
    ResetPasswordComponent,
    CitizenModalComponent,
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule, ReactiveFormsModule],
})
export class UserModule {}
