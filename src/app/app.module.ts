import { APP_INITIALIZER, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FeatureFlagService } from '@shared/services/feature-flag.service'
import { SharedModule } from '@shared/shared.module'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

const featureFactory = (featureFlagsService: FeatureFlagService) => () =>
  featureFlagsService.getFeatureFalg()

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: featureFactory,
      deps: [FeatureFlagService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
