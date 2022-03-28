import { Injectable } from '@angular/core'
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router'
import { FeatureFlagService } from '@shared/services/feature-flag.service'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagGuard implements CanLoad {
  constructor(
    private featureFlagService: FeatureFlagService,
    private router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const {
      data, // <-- Get the module name from route data
    } = route
    if (data?.feature) {
      const isEnabled = this.featureFlagService.isFeatureEnabled(data?.feature)
      if (isEnabled) {
        return true
      }
    }
    this.router.navigate(['/gerenciador/funcionalidade-desativada'])
    return false
  }
}
