import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { ToastrService } from 'ngx-toastr'
import { Subscription, throwError } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'

import { LoginService } from 'app/login/services/login.service'
import { Login } from './interfaces/login'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  currentDate: number = Date.now()
  loginSubscription: Subscription = new Subscription()
  loginRequestIsLoading: boolean = false
  form!: FormGroup

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.createForm()
  }

  get f() {
    return this.form.controls
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return
    }

    const login: Login = this.form.value as Login

    this.loginSubscription = this.loginService
      .login(login)
      .pipe(
        tap(() => (this.loginRequestIsLoading = true)),
        map(() => {
          this.loginRequestIsLoading = false
          this.toastrService.success('Login realizado com sucesso', 'Sucesso')
        }),
        catchError(({ error }) => {
          this.loginRequestIsLoading = false
          this.toastrService.error(error.message, 'Error')
          return throwError(error.message)
        })
      )
      .subscribe()
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe()
  }
}
