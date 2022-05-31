import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseResourceService } from '@core/services/base-resource.service'

@Injectable({
  providedIn: 'root',
})
export class EnumService extends BaseResourceService<String> {
  constructor(http: HttpClient) {
    super(http, 'enum')
  }
}
