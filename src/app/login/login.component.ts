import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  currentDate = Date.now()

  constructor(private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.router.navigate(['./gerenciador'])
  }
}
