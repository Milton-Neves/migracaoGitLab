import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Company } from '@core/interfaces/company'
import { BaseResourceService } from '@core/services/base-resource.service'

@Injectable({
  providedIn: 'root',
})
export class CompanyService extends BaseResourceService<Company> {
  constructor(http: HttpClient) {
    super(http, 'company')
  }
}
