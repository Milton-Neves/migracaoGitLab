import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { LoginService } from 'app/login/services/login.service'
import { ToastrService } from 'ngx-toastr'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private publicPaths = ['/login']
  private isRefreshing = false
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  )

  constructor(
    private loginService: LoginService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let actualRoute = this.router.url
    let authReq = req
    const token = this.loginService.getToken()
    if (token != null) {
      authReq = this.addTokenHeader(req, token)
    }
    return next.handle(authReq).pipe(
      tap(
        () => {},
        (err: HttpErrorResponse) => {
          const firstDigit = Math.floor(err.status / 100)

          switch (firstDigit) {
            case 4:
              if (err.status == 400)
                this.toastrService.info(err.error.message, 'Ação indisponível!')
              else if (err.status == 403)
                this.toastrService.warning(err.error.message, 'Atenção')
              break
            default:
              this.toastrService.error(
                err.error.message,
                'Ocorreu um problema...'
              )
              break
          }
        }
      ),
      catchError((err) => {
        if (
          err instanceof HttpErrorResponse &&
          !this.publicPaths.includes(actualRoute) &&
          err.status === 401
        ) {
          return this.handle401Error(authReq, next)
        }

        return throwError(err)
      })
    )
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true
      this.refreshTokenSubject.next(null)
      const token = this.loginService.getRefreshToken()
      const expiredToken = this.loginService.getToken()
      if (token && expiredToken)
        return this.loginService.refreshToken(token, expiredToken).pipe(
          switchMap((res: any) => {
            this.isRefreshing = false
            this.loginService.saveTokens(res.token, res.refreshToken)
            this.refreshTokenSubject.next(res.token)

            return next.handle(this.addTokenHeader(request, res.token))
          }),
          catchError((err) => {
            this.isRefreshing = false

            this.loginService.logout()
            return throwError(err)
          })
        )
    }
    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    )
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
}
