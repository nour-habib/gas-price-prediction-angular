import { Component, signal, inject } from '@angular/core';
import {ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../service/data.service';
import { Data } from '../../model/data.interface';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  dataService = inject(DataService);
  dataSet = new Array<Data>;
  equation = new FormGroup({
    cpi: new FormControl(''),
    oilProd: new FormControl(''),
    crudeOilPrice: new FormControl(''),

  });
  a = 0;
  b = 0;
  c = 0;
  result = signal(-1);
  resultExplanation = signal('');
  
  calculate() {
     
     //console.warn(this.equation.value);
     var cpi: number = 0;
     var crudeOil: number = 0;
     var oilProd: number = 0;

     if(this.equation.value.cpi?.valueOf() && this.equation.value.crudeOilPrice && this.equation.value.oilProd)
     {
       cpi = Number(this.equation.value.cpi.valueOf());
       crudeOil = Number(this.equation.value.crudeOilPrice.valueOf());
       oilProd = Number(this.equation.value.oilProd.valueOf());
     } 

     let gasPriceResult = (cpi*this.a) + (crudeOil*this.b) + (oilProd*this.c);

     this.result.set(gasPriceResult);
     this.resultExplanation.set("Model coefficients not yet entered");
     
     //Uncomment the following when coefficients are entered.

    //  this.resultExplanation.set("When CPI = " + this.equation.value.cpi + ", "+
    //                               "crude oil price = " + this.equation.value.crudeOilPrice + ", " +
    //                             "oil production = " + this.equation.value.oilProd + ", " + 
    //                              " the model predicts the price of gas to be " + "$" + gasPriceResult + ".00." );
  }

  clear() {
    this.equation.reset(this.equation.value);
  }

}
