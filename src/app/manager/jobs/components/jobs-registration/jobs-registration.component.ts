import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgxModalService } from 'lib/ngx-modal/src/public-api'

@Component({
  selector: 'app-jobs-registration',
  templateUrl: './jobs-registration.component.html',
  styleUrls: ['./jobs-registration.component.scss'],
})
export class JobsRegistrationComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}
  back() {
    this.router.navigate(['/gerenciador/cargos'])
  }
}
