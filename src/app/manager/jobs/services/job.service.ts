import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Job } from '@core/interfaces/resume/job'
import { BaseResourceService } from '@core/services/base-resource.service'
import { environment } from 'environments/environment'
import { Observable } from 'rxjs'
import { take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class JobService extends BaseResourceService<Job> {
  constructor(http: HttpClient) {
    super(http, 'job')
  }

  listAllWithWorkfieldColor(params = {}): Observable<any> {
    return this.http
      .get(`${environment.baseUrl}/api/job/workfield_color`, { params })
      .pipe(take(1))
  }
}
