import { ResetPasswordComponent } from './components/reset-password/reset-password.component'
import { ResetPasswordUserComponent } from './components/reset-password-user/reset-password-user.component'
import { PatternValidator, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '@shared/shared.module'
import { UserComponent } from './user.component'
import { UserRoutingModule } from './user-routing.module'
import { UserModalComponent } from './components/user-modal/user-modal.component'
import { ResetEmailComponent } from './components/reset-email/reset-email.component'
import { CitizenModalComponent } from './components/citizen-modal/citizen-modal.component'
import { LegalUserListComponent } from './components/legal-user-list/legal-user-list.component'
import { PhysicalUserListComponent } from './components/physical-user-list/physical-user-list.component'

@NgModule({
  declarations: [
    UserComponent,
    UserModalComponent,
    ResetEmailComponent,
    ResetPasswordUserComponent,
    ResetPasswordComponent,
    CitizenModalComponent,
    LegalUserListComponent,
    PhysicalUserListComponent,
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule, ReactiveFormsModule],
})
export class UserModule {}
