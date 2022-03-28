import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ApiResponse } from '@shared/models/api-response.model'
import { FeatureFlagProps } from '@shared/models/Feature-flag.model'
import { environment } from 'environments/environment'
import { get, has } from 'lodash-es'
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  featureFlagConfig: FeatureFlagProps | null = null

  private endPoints = {
    getFeatureFlag: () => 'feature-flag',
  }

  constructor(private http: HttpClient) {}

  getFeatureFalg() {
    return this.http
      .get<ApiResponse<FeatureFlagProps>>(
        `${environment.baseUrl}/api/${this.endPoints.getFeatureFlag()}`
      )
      .pipe(tap((res) => (this.featureFlagConfig = res.data)))
  }

  isFeatureEnabled(key: string) {
    if (this.featureFlagConfig && has(this.featureFlagConfig, key)) {
      return get(this.featureFlagConfig, key, false)
    }
    return false
  }
}
