import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  a = 0;
  b = 0;
  c = 0;
  
  calculate(consumerPriceIndex: number, oilProd: number, crudeOilPrice: number): number {
     let  answer = 0;

      return answer;
  }



}
