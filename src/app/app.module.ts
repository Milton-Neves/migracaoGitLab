import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { APP_INITIALIZER, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { JwtInterceptor } from '@core/interceptors/jwt-interceptor'
import { FeatureFlagService } from '@shared/services/feature-flag.service'
import { SharedModule } from '@shared/shared.module'
import { ToastrModule } from 'ngx-toastr'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

const featureFactory = (featureFlagsService: FeatureFlagService) => () =>
  featureFlagsService.getFeatureFlag()
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
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
