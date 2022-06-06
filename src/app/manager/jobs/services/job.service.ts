import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Job } from '@core/interfaces/resume/job'
import { BaseResourceService } from '@core/services/base-resource.service'
import { environment } from 'environments/environment'

@Injectable({
  providedIn: 'root',
})
export class JobService extends BaseResourceService<Job> {
  constructor(http: HttpClient) {
    super(http, 'job')
  }
  getWorkfields() {
    return this.http.get(`${environment.baseUrl}/api/workfield`)
  }
}
