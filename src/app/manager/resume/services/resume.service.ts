import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ApiResponse } from '@shared/models/api-response.model'
import { environment } from 'environments/environment'
import { Observable } from 'rxjs'

import { ResumeProps } from '../entities/resume.model'

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  endpoints = {
    listAll: () => 'resume',
    getOne: (id: number) => `resume/${id}`,
  }

  constructor(private http: HttpClient) {}

  getResume(params?: any): Observable<ApiResponse<ResumeProps[]>> {
    return this.http.get<ApiResponse<ResumeProps[]>>(
      `${environment.baseUrl}/api/${this.endpoints.listAll()}`,
      {
        params: {
          ...params,
        },
      }
    )
  }

  getOneResume(id: number): Observable<ApiResponse<ResumeProps>> {
    return this.http.get<ApiResponse<ResumeProps>>(
      `${environment.baseUrl}/api/${this.endpoints.getOne(id)}`
    )
  }

  getWorkfields(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${environment.baseUrl}/api/workfield`
    )
  }
}
