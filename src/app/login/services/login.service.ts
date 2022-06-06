import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ExpiresTokenWarningComponent } from '@shared/components/expires-token-warning/expires-token-warning.component'
import { JwtResponse } from 'app/login/interfaces/jwt-response'
import { Login } from 'app/login/interfaces/login'
import { environment } from 'environments/environment'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'
import { ToastrService } from 'ngx-toastr'
import { BehaviorSubject, Observable } from 'rxjs'
import { take, tap } from 'rxjs/operators'

import { roles } from '../../shared/constants/roles'
import { User } from '../interfaces/user'

const TOKEN_KEY: string = 'sgi-banco-de-empregos:token'
const REFRESH_TOKEN_KEY: string = 'sgi-banco-de-empregos:refresh_token'
const USER_KEY: string = 'sgi-banco-de-empregos:user'
const EXPIRES_TOKEN: string = 'sgi-banco-de-empregos:expiresTime'
const USER_ROLE: string = 'sgi-banco-de-empregos:userRole'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly API_URL: string = `${environment.baseUrl}/api/auth`
  private IsOpenModal: boolean = false

  private endpoints = {
    refreshToken: (token?: string) =>
      `refresh_token${token == undefined ? '' : `/${token}`}`,
    checkRole: (role: string) => `/auth_check`,
  }

  interval: any
  isPermitted$ = new BehaviorSubject<any>({
    superAdmin: false,
    adminSemas: false,
    employeeSemas: false,
  })
  isAuthenticated = new BehaviorSubject<boolean>(false)
  authenticatedUser = new BehaviorSubject<User>({
    id: 0,
    login: '',
    roles: [],
  })

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: NgxModalService,
    private toastr: ToastrService
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
        this.setPermissions(roles)
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
    }, 1000 * 60 * 10) // Tempo do ciclo que ele irá verificar se o token está perto de expirar... 10 min.
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

  /**
   * Função para fazer reload em algumas informações para quando
   * o usuario der reload na pagina.
   */
  refreshInformation() {
    let expiresDate: string | null = sessionStorage.getItem(EXPIRES_TOKEN)
    let userRole: string | null = sessionStorage.getItem(USER_ROLE)
    if (expiresDate != null) {
      this.startTimer(expiresDate)
    }

    if (userRole !== null) {
      const role = userRole

      this.http
        .get(`${this.API_URL}${this.endpoints.checkRole(role)}`, {
          params: {
            role,
          },
        })
        .subscribe((res: any) => {
          if (!res.data) {
            this.toastr.warning('Opss, um erro inesperado ocorreu!')
            this.logout()
          } else {
            this.setPermissions([role])
          }
        })
    }
  }

  logout(): void {
    this.removeRefreshToken()
    this.isAuthenticated.next(false)
    this.isPermitted$.next(false)
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

  verifyPermissions(rolesPermitted: string[]) {
    const havePermission: boolean[] = []
    const actualRole: any = {
      superadmin: this.isPermitted$.getValue().superAdmin,
      admin_semas: this.isPermitted$.getValue().adminSemas,
      employee_semas: this.isPermitted$.getValue().employeeSemas,
    }

    rolesPermitted.map((role: string) => {
      havePermission.push(actualRole[role.toLowerCase()])
    })

    return havePermission.some((res: any) => res)
  }

  private setPermissions(role: string[]) {
    this.isPermitted$.next({
      superAdmin: this.verifyUserRole(role, roles.superAdmin),
      adminSemas: this.verifyUserRole(role, roles.adminSemas),
      employeeSemas: this.verifyUserRole(role, roles.employeeSemas),
    })
    sessionStorage.setItem(USER_ROLE, role[0])
  }

  private saveUserToLocalStorage(user: User): void {
    this.authenticatedUser.next(user)
    sessionStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  private verifyUserRole(userRole: string[], systemRole: string): boolean {
    return userRole[0] === systemRole
  }
}
