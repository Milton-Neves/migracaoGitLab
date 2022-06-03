import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { EMPTY, Subscription } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { Company } from '../../entities/company.model'
import { CompanyService } from '../../services/company.service'

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss'],
})
export class CompanyRegistrationComponent implements OnInit, OnDestroy {
  form!: FormGroup
  serviceubscription = new Subscription()

  constructor(
    private builder: FormBuilder,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.form = this.createForm()
  }

  onSubmit() {
    const values = this.form.value as Company

    this.serviceubscription = this.companyService
      .create(values)
      .pipe(
        map((res) => res),
        catchError(() => EMPTY)
      )
      .subscribe()
  }

  private createForm(): FormGroup {
    return this.builder.group({
      name: [''],
      cnpj: [''],
      companyName: [],
      amountEmployees: [],
    })
  }

  ngOnDestroy(): void {
    this.serviceubscription.unsubscribe()
  }
}
