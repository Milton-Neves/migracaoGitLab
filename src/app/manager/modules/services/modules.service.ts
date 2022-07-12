import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseResourceService } from '@core/services/base-resource.service'
import Module from 'module'
import { ToastrService } from 'ngx-toastr/public_api'

@Injectable({
  providedIn: 'root',
})
export class ModulesService extends BaseResourceService<Module> {
  constructor(http: HttpClient, private toastrService: ToastrService) {
    super(http, 'feature_flag')
  }
}
