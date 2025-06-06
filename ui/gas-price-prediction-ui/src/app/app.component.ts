import { Component } from '@angular/core';
import { RouterModule, RouterOutlet} from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from "ng-apexcharts";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    NavigationComponent,
    HttpClientModule,
    NgApexchartsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gas-price-prediction-ui';
  //console.log("window size: ", window.innerWidth);
}
