import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ApiResponse } from '@core/interfaces/api-response.model'
import { Forwarding } from '@core/interfaces/resume/forwading'
import { BaseResourceService } from '@core/services/base-resource.service'
import { environment } from 'environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ForwardingService extends BaseResourceService<any> {
  constructor(http: HttpClient) {
    super(http, 'forwarding')
  }

  finishForwarding(forwarding: any): Observable<ApiResponse<Forwarding>> {
    return this.http.put<ApiResponse<Forwarding>>(
      `${environment.baseUrl}/api/forwarding/finish/${forwarding.id}`,
      forwarding
    )
  }
}
