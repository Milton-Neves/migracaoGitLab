import { Component, OnInit } from '@angular/core'
import { SGIMetrics } from '@core/interfaces/metric/sgi-metrics'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { SGIMetricsService } from './service/sgi-metrics.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  portalMetrics: Observable<SGIMetrics> = new Observable()

  constructor(private sgiMetrics: SGIMetricsService) {}

  ngOnInit(): void {
    this.portalMetrics = this.sgiMetrics.getSGI().pipe(tap(console.log))
  }
}
