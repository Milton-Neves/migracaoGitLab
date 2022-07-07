import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { PhysicalPersonProps } from '@core/interfaces/physical-person/physical-person.model'
import { BaseResourceService } from '@core/services/base-resource.service'
import { environment } from 'environments/environment'

@Injectable({
  providedIn: 'root',
})
export class PhysicalUserService extends BaseResourceService<PhysicalPersonProps> {
  private endPoints = {
    resetPassword: () => '/api/physical_user/reset_password',
  }

  constructor(http: HttpClient) {
    super(http, 'physical_user')
  }

  resetPassword(resetPassword: { id: number; email: string }) {
    return this.http.put(
      `${environment.baseUrl}${this.endPoints.resetPassword()}`,
      resetPassword
    )
  }
}
