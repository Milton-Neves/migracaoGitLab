import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Resume } from '@core/interfaces/resume/resume'
import { BaseResourceService } from '@core/services/base-resource.service'

@Injectable({
  providedIn: 'root',
})
export class ResumeService extends BaseResourceService<Resume> {
  getOneResume(resumeId: number) {
    throw new Error('Method not implemented.')
  }
  getWorkfields(): void {
    throw new Error('Method not implemented.')
  }
  constructor(http: HttpClient) {
    super(http, 'resume')
  }
}
