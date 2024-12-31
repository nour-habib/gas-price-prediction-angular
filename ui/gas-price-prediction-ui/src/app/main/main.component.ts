import { Component } from '@angular/core';
import { CalculatorComponent } from '../calculator/calculator.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CalculatorComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
