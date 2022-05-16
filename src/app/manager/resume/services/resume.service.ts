import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Resume } from '@core/interfaces/resume/resume'
import { BaseResourceService } from '@core/services/base-resource.service'

@Injectable({
  providedIn: 'root',
})
export class ResumeService extends BaseResourceService<Resume> {
  constructor(http: HttpClient) {
    super(http, 'resume')
  }
}
