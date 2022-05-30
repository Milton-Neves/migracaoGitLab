import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ExpiresTokenWarningComponent } from '@shared/components/expires-token-warning/expires-token-warning.component'
import { JwtResponse } from 'app/login/interfaces/jwt-response'
import { Login } from 'app/login/interfaces/login'
import { environment } from 'environments/environment'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { BehaviorSubject, Observable } from 'rxjs'
import { take, tap } from 'rxjs/operators'

import { User } from '../interfaces/user'

const TOKEN_KEY: string = 'sgi-banco-de-empregos:token'
const REFRESH_TOKEN_KEY: string = 'sgi-banco-de-empregos:refresh_token'
const USER_KEY: string = 'sgi-banco-de-empregos:user'
const EXPIRES_TOKEN: string = 'sgi-banco-de-empregos:expiresTime'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly API_URL: string = `${environment.baseUrl}/api/auth`
  private IsOpenModal: boolean = false

  private endpoints = {
    refreshToken: (token?: string) =>
      `refresh_token${token == undefined ? '' : `/${token}`}`,
  }

  interval: any
  isAuthenticated = new BehaviorSubject<boolean>(false)
  authenticatedUser = new BehaviorSubject<User>({
    id: 0,
    login: '',
    roles: [],
  })

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: NgxModalService
  ) {
    const isAuthenticated = !!sessionStorage.getItem(TOKEN_KEY)
    this.isAuthenticated.next(isAuthenticated)
  }

  login(login: Login): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.API_URL}/signin`, login).pipe(
      tap(({ token, refreshToken, id, login, roles }) => {
        let currentTimeDate = new Date()
        currentTimeDate.setHours(currentTimeDate.getHours() + 6)
        this.isAuthenticated.next(true)
        this.saveTokens(token, refreshToken)
        sessionStorage.setItem(EXPIRES_TOKEN, currentTimeDate.toString())
        this.startTimer(currentTimeDate.toString())
        this.saveUserToLocalStorage({
          id,
          login,
          roles,
        })

        this.router.navigate(['/gerenciador'])
      }),
      take(1)
    )
  }

  startTimer(leftTimeDate: string) {
    this.interval = setInterval(() => {
      let leftTime: {
        expiresHours: number
        expiresMinutes: number
        expiresSeconds: number
      } = this.calculateExpiresDate(new Date(leftTimeDate))

      if (
        leftTime.expiresHours <= 0 &&
        leftTime.expiresMinutes <= 12 &&
        !this.IsOpenModal
      ) {
        this.IsOpenModal = true
        this.modalService
          .open(
            ExpiresTokenWarningComponent,
            {
              leftTimeDate,
              currentMinuteLeft: leftTime.expiresMinutes,
            },
            { ignoreBackClick: true }
          )
          .subscribe()
      }
    }, 1000 * 60 * 10)
  }

  calculateExpiresDate(expiresDate: Date) {
    const diffTime = expiresDate.getTime() - new Date().getTime()

    let expiresSeconds = Math.floor(diffTime / 1000)
    let expiresMinutes = Math.floor(expiresSeconds / 60)
    let expiresHours = Math.floor(expiresMinutes / 60)

    expiresSeconds = expiresSeconds % 60
    expiresMinutes = expiresMinutes % 60

    return { expiresHours, expiresMinutes, expiresSeconds }
  }

  saveTokens(token: string, refreshToken: string) {
    sessionStorage.setItem(TOKEN_KEY, JSON.stringify(token))
    sessionStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(refreshToken))
  }

  refreshToken(refreshToken: string, expiredToken: string) {
    return this.http.post(
      `${environment.baseUrl}/api/${this.endpoints.refreshToken()}`,
      {
        refreshToken,
        expiredToken,
      }
    )
  }

  removeRefreshToken() {
    this.http
      .delete(
        `${environment.baseUrl}/api/${this.endpoints.refreshToken(
          this.getRefreshToken()
        )}`
      )
      .subscribe()
  }

  logout(): void {
    this.removeRefreshToken()
    this.isAuthenticated.next(false)
    sessionStorage.clear()
    clearInterval(this.interval)
    this.router.navigate(['/login'])
  }

  getToken(): string | null {
    const token = sessionStorage.getItem(TOKEN_KEY)
    if (!token) {
      return null
    }
    return JSON.parse(token)
  }

  getRefreshToken() {
    const token = sessionStorage.getItem(REFRESH_TOKEN_KEY)
    if (!token) {
      return null
    }
    return JSON.parse(token)
  }

  private saveUserToLocalStorage(user: User): void {
    this.authenticatedUser.next(user)
    sessionStorage.setItem(USER_KEY, JSON.stringify(user))
  }
}
