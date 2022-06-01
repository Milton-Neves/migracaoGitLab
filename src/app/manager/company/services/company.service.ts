import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseResourceService } from '@core/services/base-resource.service'

@Injectable({
  providedIn: 'root',
})
export class CompanyService extends BaseResourceService<any> {
  constructor(http: HttpClient) {
    super(http, 'legal_person')
  }
}
