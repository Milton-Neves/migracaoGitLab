import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Forwarding } from '@core/interfaces/resume/forwading'
import { BaseResourceService } from '@core/services/base-resource.service'

@Injectable({
  providedIn: 'root',
})
export class ForwardingService extends BaseResourceService<Forwarding> {
  constructor(http: HttpClient) {
    super(http, 'forwarding')
  }
}
