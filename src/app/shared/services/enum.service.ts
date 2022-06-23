import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseResourceService } from '@core/services/base-resource.service'
import { environment } from 'environments/environment'
import { Observable } from 'rxjs'
import { take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class EnumService extends BaseResourceService<String> {
  constructor(http: HttpClient) {
    super(http, 'enum')
  }

  getAmountEmployees(): Observable<string[]> {
    return this.http
      .get<string[]>(`${environment.baseUrl}/api/enum/amount_employees`)
      .pipe(take(1))
  }
}
