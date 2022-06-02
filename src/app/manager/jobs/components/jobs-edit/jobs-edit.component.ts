import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-jobs-edit',
  templateUrl: './jobs-edit.component.html',
  styleUrls: ['./jobs-edit.component.scss'],
})
export class JobsEditComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  back() {
    this.router.navigate(['/gerenciador/cargos'])
  }
}
