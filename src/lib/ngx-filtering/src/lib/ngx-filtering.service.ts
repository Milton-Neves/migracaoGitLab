import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'environments/environment'

@Injectable({
  providedIn: 'root',
})
export class NgxFilteringService {
  endpoints = {
    jobs: () => 'job',
  }
  constructor(private http: HttpClient) {}

  get jobs() {
    return this.http.get(`${environment.baseUrl}/api/${this.endpoints.jobs()}`)
  }
}
