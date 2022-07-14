import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseResourceService } from '@core/services/base-resource.service'
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root',
})
export class ModulesService extends BaseResourceService<any> {
  constructor(http: HttpClient, private toastrService: ToastrService) {
    super(http, 'feature_flag')
  }
}
