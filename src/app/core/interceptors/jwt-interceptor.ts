import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'

import { LoginService } from 'app/login/services/login.service'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.loginService.getToken()

    if (!token) {
      return next.handle(request)
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })

    return next.handle(request)
  }
}
