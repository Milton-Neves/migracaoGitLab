import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'
import { take } from 'rxjs/operators'

import { environment } from 'environments/environment'
import { SGIMetrics } from '@core/interfaces/metric/sgi-metrics'

@Injectable({
  providedIn: 'root',
})
export class SGIMetricsService {
  private readonly API_URL = `${environment.baseUrl}/api/metric`

  constructor(private http: HttpClient) {}

  getSGI(): Observable<SGIMetrics> {
    return this.http.get<SGIMetrics>(`${this.API_URL}/sgi`).pipe(take(1))
  }
}
