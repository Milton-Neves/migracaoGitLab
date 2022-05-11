import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Workfield } from '@core/interfaces/resume/workfield'
import { BaseResourceService } from '@core/services/base-resource.service'

@Injectable({
  providedIn: 'root',
})
export class WorkfieldService extends BaseResourceService<Workfield> {
  constructor(http: HttpClient) {
    super(http, 'workfield')
  }
}
