import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FooterComponent } from './components/footer/footer.component'
import { LogoutComponent } from './components/logout/logout.component'
import { SidebarComponent } from './components/sidebar/SidebarComponent'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [FooterComponent, LogoutComponent, SidebarComponent],
  imports: [CommonModule, RouterModule],
})
export class CoreModule {}
