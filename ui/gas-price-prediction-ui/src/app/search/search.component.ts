import { Component, inject } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Data } from '@angular/router';
import { CalculatorComponent } from '../calculator/calculator.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CalculatorComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  dataService = inject(DataService);
  dataSet = new Array<Data>;
  filteredData = new Array<Data>();
  months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  years = ["2016", "2017", "2018", "2019", "2020", "2021", "2022"];

  searchForm = new FormGroup({
    gasPrice: new FormControl(''),
    cpi: new FormControl(''),
    crudeOilPrice: new FormControl(''),
    oilProd: new FormControl(''),
    fromMonth: new FormControl('', Validators.required),
    fromYear: new FormControl('', Validators.required),
    toMonth: new FormControl('', Validators.required),
    toYear: new FormControl('', Validators.required),
  });

  search() {
      //make call to dataService and return requested datas
      console.warn(this.searchForm.value);

      var fyear = '';
      var tyear = '';
      var fMonth = '';
      var tMonth = '';

      if(this.searchForm.value.fromYear)
      {
        fyear = this.searchForm.value.fromYear;
      }
      if(this.searchForm.value.toYear)
      {
        tyear = this.searchForm.value.toYear;
      }
      if(this.searchForm.value.toMonth)
      {
        tMonth = this.searchForm.value.toMonth;
      }
      if(this.searchForm.value.fromMonth)
      {
        fMonth = this.searchForm.value.fromMonth;
       }
   
      
    //verify that fromYear < toYear
    if(this.validateDate(fyear, tyear, fMonth, tMonth))
    {

    }
    //cheeck which features are checked
    //filter dataSet with required information
    //m

  }

  validateDate(fYear: string, tYear: string, fMonth: string, tMonth: string): boolean {
      let fromYear = Number(fYear);
      let toYear = Number(tYear);
      
    if(fromYear > toYear)
      {
         return false;
      }
      else if(fromYear == toYear)
      {
        let indexF = this.months.findIndex((element) => element==fMonth);
        let indexT = this.months.findIndex((element) => element==tMonth);
        console.log("indexF: ", indexF);
        console.log("indexT: ", indexT);
        if(indexF > indexT)
        {
          return false;
        }
      }
      return true;
  }


}
