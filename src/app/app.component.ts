import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sgi-banco-de-empregos';
  constructor() {
  }
  ngOnInit(): void {
  }
  create($event: any) {
    console.log($event, "criou");
  }


}
