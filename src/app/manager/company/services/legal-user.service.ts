import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseResourceService } from '@core/services/base-resource.service'
import { User } from 'app/login/interfaces/user'

@Injectable({
  providedIn: 'root',
})
export class LegalUserService extends BaseResourceService<User> {
  constructor(http: HttpClient) {
    super(http, 'legal_user')
  }
}
