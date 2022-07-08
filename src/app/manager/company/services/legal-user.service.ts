import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseResourceService } from '@core/services/base-resource.service'
import { User } from 'app/login/interfaces/user'
import { environment } from 'environments/environment'

@Injectable({
  providedIn: 'root',
})
export class LegalUserService extends BaseResourceService<User> {
  private endPoints = {
    resetPassword: (id: number) => `/api/legal_user/reset_password/${id}`,
  }
  constructor(http: HttpClient) {
    super(http, 'legal_user')
  }

  resetPassword(id: number) {
    return this.http.put(
      `${environment.baseUrl}${this.endPoints.resetPassword(id)}`,
      {}
    )
  }
}
