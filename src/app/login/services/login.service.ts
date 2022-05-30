import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { BehaviorSubject, Observable } from 'rxjs'
import { take, tap } from 'rxjs/operators'

import { environment } from 'environments/environment'
import { Login } from 'app/login/interfaces/login'
import { JwtResponse } from 'app/login/interfaces/jwt-response'
import { User } from '../interfaces/user'

const TOKEN_KEY: string = 'sgi-banco-de-empregos:token'
const USER_KEY: string = 'sgi-banco-de-empregos:user'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly API_URL: string = `${environment.baseUrl}/api/auth`

  isAuthenticated = new BehaviorSubject<boolean>(false)
  authenticatedUser = new BehaviorSubject<User>({
    id: 0,
    login: '',
    roles: [],
  })

  constructor(private http: HttpClient, private router: Router) {
    const isAuthenticated = !!sessionStorage.getItem(TOKEN_KEY)
    this.isAuthenticated.next(isAuthenticated)
  }

  login(login: Login): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.API_URL}/signin`, login).pipe(
      tap(({ token, id, login, roles }) => {
        this.isAuthenticated.next(true)
        sessionStorage.setItem(TOKEN_KEY, JSON.stringify(token))

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

  logout(): void {
    this.isAuthenticated.next(false)
    sessionStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(USER_KEY)
    this.router.navigate(['/login'])
  }

  getToken(): string | null {
    const token = sessionStorage.getItem(TOKEN_KEY)
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
