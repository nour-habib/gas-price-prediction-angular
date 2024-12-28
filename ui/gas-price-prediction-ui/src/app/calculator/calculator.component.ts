import { Component } from '@angular/core';
import {ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  equation = new FormGroup({
    cpi: new FormControl(''),
    oilProd: new FormControl(''),
    crudeOilPrice: new FormControl(''),

  });
  a = 1;
  b = 1;
  c = 1;
  
  calculate() {
     let  answer = 0;
     console.warn(this.equation.value);
     let cpi = this.equation.value.cpi;
     let crudeOil = this.equation.value.crudeOilPrice;
     let oilProd = this.equation.value.crudeOilPrice;
     
    //  let result = a*(cpi) + 


      return answer;
  }



}
