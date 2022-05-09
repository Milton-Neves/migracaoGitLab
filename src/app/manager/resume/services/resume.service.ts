import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Resume } from '@core/interfaces/resume/resume'
import { ApiResponse } from '@shared/models/api-response.model'
import { environment } from 'environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  endpoints = {
    listAll: () => 'resume',
    getOne: (id: number) => `resume/${id}`,
  }

  constructor(private http: HttpClient) {}

  getResume(params?: any): Observable<ApiResponse<Resume[]>> {
    return this.http.get<ApiResponse<Resume[]>>(
      this.endpoints +
        '?params=' +
        params`${environment.baseUrl}/api/${this.endpoints.listAll()}`,
      {
        params: {
          ...params,
        },
      }
    )
  }

  getOneResume(id: number): Observable<ApiResponse<Resume>> {
    return this.http.get<ApiResponse<Resume>>(
      `${environment.baseUrl}/api/${this.endpoints.getOne(id)}`
    )
  }

  getWorkfields(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${environment.baseUrl}/api/workfield`
    )
  }
}
