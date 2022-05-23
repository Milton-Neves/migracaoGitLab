import { HttpClient } from '@angular/common/http'
import { taggedTemplate } from '@angular/compiler/src/output/output_ast'
import { Injectable } from '@angular/core'

import { Company } from '@core/interfaces/company'
import { BaseResourceService } from '@core/services/base-resource.service'

@Injectable({
  providedIn: 'root',
})
export class CompanyService extends BaseResourceService<Company> {
  constructor(http: HttpClient) {
    super(http, 'legal_user')
  }
}
