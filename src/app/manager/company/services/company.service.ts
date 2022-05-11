import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ApiResponse } from '@shared/models/api-response.model'
import { environment } from 'environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  getCompanys() {
    throw new Error('Method not implemented.')
  }
  endpoints = {
    listAll: () => 'company',
    getOne: (id: number) => `company/${id}`,
  }
  constructor(private http: HttpClient) {}
  getCompanyService(params?: any): Observable<ApiResponse<CompanyService[]>> {
    return this.http.get<ApiResponse<CompanyService[]>>(
      `${environment.baseUrl}/api/${this.endpoints.listAll()}`,
      {
        params: {
          ...params,
        },
      }
    )
  }

  getOneCompanyService(id: number): Observable<ApiResponse<CompanyService>> {
    return this.http.get<ApiResponse<CompanyService>>(
      `${environment.baseUrl}/api/${this.endpoints.getOne(id)}`
    )
  }

  getWorkfields(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${environment.baseUrl}/api/workfield`
    )
  }
}
