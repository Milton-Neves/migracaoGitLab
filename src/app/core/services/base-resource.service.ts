import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'

import { Observable, throwError } from 'rxjs'
import { catchError, take } from 'rxjs/operators'

import { environment } from 'environments/environment'
import { ApiResponse } from '@core/interfaces/api-response.model'

@Injectable({
  providedIn: 'root',
})
export class BaseResourceService<T> {
  private readonly API_URL = `${environment.baseUrl}/api`
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  constructor(
    protected http: HttpClient,
    @Inject(String) private resourceEndpointBase: string
  ) {}

  findOne(endpoint = '', options = {}): Observable<ApiResponse<T>> {
    return this.http
      .get<ApiResponse<T>>(
        `${this.API_URL}/${this.resourceEndpointBase}/${endpoint}`,
        {
          headers: this.headers,
          ...options,
        }
      )
      .pipe(take(1), catchError(this.handleError))
  }

  findAll(endpoint = 'companies', params = {}): Observable<ApiResponse<T[]>> {
    return this.http
      .get<ApiResponse<T[]>>(
        `${this.API_URL}/${this.resourceEndpointBase}/${endpoint}`,
        {
          params,
          headers: this.headers,
        }
      )
      .pipe(take(1), catchError(this.handleError))
  }

  create(resource: any, endpoint: string = '', options = {}): Observable<T> {
    return this.http
      .post<T>(
        `${this.API_URL}/${this.resourceEndpointBase}/${endpoint}`,
        resource,
        {
          headers: this.headers,
          ...options,
        }
      )
      .pipe(take(1), catchError(this.handleError))
  }

  delete(endpoint = '', options = {}): Observable<ApiResponse<T>> {
    return this.http
      .delete<ApiResponse<T>>(
        `${this.API_URL}/${this.resourceEndpointBase}/${endpoint}`,
        {
          headers: this.headers,
          ...options,
        }
      )
      .pipe(take(1), catchError(this.handleError))
  }

  update(
    resource: T,
    endpoint: string = '',
    options = {}
  ): Observable<ApiResponse<T>> {
    return this.http
      .put<ApiResponse<T>>(
        `${this.API_URL}/${this.resourceEndpointBase}/${endpoint}`,
        resource,
        {
          headers: this.headers,
          ...options,
        }
      )
      .pipe(take(1), catchError(this.handleError))
  }

  private handleError(error: any) {
    let errorMessage =
      error.error instanceof ErrorEvent
        ? error.error.message
        : `Error Code: ${error.status}\nMessage: ${error.message}`

    return throwError(() => errorMessage)
  }
}
