import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FooterComponent } from './components/footer/footer.component'
import { LogoutComponent } from './components/logout/logout.component'
import { SidebarComponent } from './components/sidebar/SidebarComponent'
import { RouterModule } from '@angular/router'
import { LayoutComponent } from './components/layout/layout.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [
    FooterComponent,
    LogoutComponent,
    SidebarComponent,
    LayoutComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [LayoutComponent],
})
export class CoreModule {}
