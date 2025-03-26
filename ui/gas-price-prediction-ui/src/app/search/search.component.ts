import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Data } from '@angular/router';
import { CalculatorComponent } from '../calculator/calculator.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApexGrid, ColumnConfiguration } from 'apex-grid';
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
ApexGrid.register();

type DataObj = {
  date: string;
  feature: string;
  value: number;
};

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CalculatorComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})


export class SearchComponent {
  
  dataService = inject(DataService);
  cpi = signal(false);
  gasPrice = signal(false);
  crudeOilPrice = signal(false);
  oilProd = signal(false);

  searchData = signal<Data[]>([]);
  dataSet = new Array<Data>;
  invalidDateMsg = signal('');
  dataIsSet = signal(false);

  months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  years = ["2016", "2017", "2018", "2019", "2020", "2021", "2022"];

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


  protected data!: Data[];
  protected columns!: ColumnConfiguration<Data>[];



  constructor(){}

  ngOnInit(): void{
    console.log("search component: ngOnInit()");
    this.getDataSet();


    this.initializeTable();
    
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



    var filteredbyDate: Array<Data> = this.dataSet.filter(a => {
    var date = new Date(a['Date']);
    return (date >= startDate && date <= endDate);
      });

      console.log("filteredByDate: ", filteredbyDate);

    //Sort by date
    filteredbyDate.sort((a,b) => {
        const ob1 = Date.parse(a['Date']);
        const ob2 = Date.parse(b['Date']);
        return ob1 - ob2;
    });

    console.log("sorted by date: ", filteredbyDate);

    
    if(this.searchForm.value.cpi){
      this.cpi.set(true);
    }
    if(this.searchForm.value.gasPrice){
      this.gasPrice.set(true);
   
    }
    if(this.searchForm.value.crudeOilPrice){
      this.crudeOilPrice.set(true);
      
    }
    if(this.searchForm.value.oilProd){
      this.oilProd.set(true);
    }

    this.searchData.set(filteredbyDate);
    this.data = filteredbyDate;
    this.columns = [
      { key: "date", headerText: "Date" },
      {
        key: "features",
        headerText: "Features",
        type: "string",
        //cellTemplate: this.format,
      },
      { key: "value", type: "number", headerText: "Value" },
      
    ];
  
    this.dataIsSet.set(true);
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

  initializeTable(){

  //    protected columns: ColumnConfiguration<Data>[] = [
  //   { key: "date", headerText: "Date" },
  //   {
  //     key: "features",
  //     headerText: "Features",
  //     type: "string",
  //     //cellTemplate: this.format,
  //   },
  //   { key: "value", type: "number", headerText: "Value" },
    
  // ];



  }

}


