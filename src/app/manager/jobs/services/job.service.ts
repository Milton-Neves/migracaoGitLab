import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Job } from '@core/interfaces/resume/job'
import { BaseResourceService } from '@core/services/base-resource.service'

@Injectable({
  providedIn: 'root',
})
export class JobService extends BaseResourceService<Job> {
  constructor(http: HttpClient) {
    super(http, 'legal_user')
  }
}
