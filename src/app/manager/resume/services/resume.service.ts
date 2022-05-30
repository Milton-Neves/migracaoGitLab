import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Archiving } from '@core/interfaces/resume/archiving'
import { Resume } from '@core/interfaces/resume/resume'
import { BaseResourceService } from '@core/services/base-resource.service'
import { environment } from 'environments/environment'
import { ToastrService } from 'ngx-toastr'
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ResumeService extends BaseResourceService<Resume> {
  constructor(http: HttpClient, private toastrService: ToastrService) {
    super(http, 'resume')
  }

  archivingResume(archiving: Archiving) {
    return this.http
      .post(`${environment.baseUrl}/api/archiving`, archiving)
      .pipe(
        tap(
          () => this.toastrService.success('Currículo arquivado com sucesso!'),
          (err) => this.toastrService.error(err.message)
        )
      )
  }
}
