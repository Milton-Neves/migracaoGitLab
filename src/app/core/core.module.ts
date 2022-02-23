import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FooterComponent } from './components/footer/footer.component'
import { LogoutComponent } from './components/logout/logout.component'
import { RouterModule } from '@angular/router'
import { LayoutComponent } from './components/layout/layout.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'

@NgModule({
  declarations: [
    FooterComponent,
    LogoutComponent,
    LayoutComponent,
    SidebarComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [LayoutComponent],
})
export class CoreModule { }
