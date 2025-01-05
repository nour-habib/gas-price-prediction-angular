import { Component, inject, signal } from '@angular/core';
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
  dict = signal(new Map<String, Array<String>>);
  dates = signal<String[]>([]);
  cpi = signal<String[]>([]);
  gasPrice = signal<String[]>([]);
  crudeOilPrice = signal<String[]>([]);
  oilProd = signal<String[]>([]);
  searchData = signal<Map<String, []>[]>([]);
  dataSet = new Array<Data>;
  months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  years = ["2016", "2017", "2018", "2019", "2020", "2021", "2022"];
  invalidDateMsg = signal('');
  dataIsSet = signal(false);

  searchForm = new FormGroup({
    gasPrice: new FormControl(''),
    cpi: new FormControl(''),
    crudeOilPrice: new FormControl(''),
    oilProd: new FormControl(''),
    fromMonth: new FormControl(''),
    fromYear: new FormControl(''),
    toMonth: new FormControl(''),
    toYear: new FormControl(''),
  });

  constructor(){}

  ngOnInit(): void{
    console.log("search component: ngOnInit()");
    this.getDataSet();
    //this.dataService.fetchData();
  }

  search() {
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
   
    if(!this.validateDate(fyear, tyear, fMonth, tMonth))
    {
      this.invalidDateMsg.set('Invalid dates. Try again.');
    }

    //Filter by date first
    var indexF = this.months.findIndex((element) => element==fMonth);
    var indexT = this.months.findIndex((element) => element==tMonth);
    
    console.log("indexF: ", indexF);
    console.log("indexT: ", indexT);

    console.log("fyear: ", Number(fyear));
    console.log("tyear: ", Number(tyear));


    var startDate = new Date(Number(fyear), indexF+1);
    var endDate = new Date(Number(tyear), indexT+1);

    console.log("startDate: ", startDate);
    console.log("eendDate: ", endDate);

    var filteredbyDate = this.dataSet.filter(a => {
    var date = new Date(a['Date']);
    return (date >= startDate && date <= endDate);
      });

      console.log("filteredByDate: ", filteredbyDate);

    var dates = filteredbyDate.map(data => data['Date']);
    this.dates.set(dates);
    console.log("new dates: ", dates);

    var datesObj = {"dates": dates};

    var dateMap = new Map();
    dateMap.set("dates", dates);
  
    var searchArr = [];
    searchArr[0] = dateMap;
    
    if(this.searchForm.value.cpi){
      
      var cpi = filteredbyDate.map(data => data['consumerPriceIndex']);
      console.log("cpi: ", cpi);
      this.cpi.set(cpi);
      var cpiMap = new Map();
      cpiMap.set("cpi", cpi);
      searchArr[1] = cpiMap;
    }
    if(this.searchForm.value.gasPrice){
      var gas = filteredbyDate.map(data => data['gasPrice']);
      console.log("gas: ", gas);
      this.gasPrice.set(gas);
      var gasMap = new Map();
      searchArr[2] = gasMap;
   
    }
    if(this.searchForm.value.crudeOilPrice){
      
      var crudeOil = filteredbyDate.map(data => data['crudeOilPrice']);
      console.log("crudeOilPrice: ", crudeOil);
      this.crudeOilPrice.set(crudeOil);
      var coMap = new Map();
      searchArr[3] = coMap;
      
    }
    if(this.searchForm.value.oilProd){
      
      var oilProd = filteredbyDate.map(data => data['oilProduction']);
      console.log("oilProd: ", oilProd);
      this.oilProd.set(oilProd);
      var oilProdMap = new Map();
      searchArr[4] = oilProdMap;
    }

    this.searchData.set(searchArr);
    console.log("searchData: ", this.searchData.toString);
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

  async getDataSet() {
    (await this.dataService.getData()).subscribe((data) => {
        this.dataSet = data;
        console.log("search component: dataSet: ", this.dataSet); 
    });
  }

  toggleData(){
    // this.dataIsSet.set(!this.dataIsSet());
    // if (this.dataIsSet()) {
    //   this.isExpanded.set(true);
    // }
  }



}
