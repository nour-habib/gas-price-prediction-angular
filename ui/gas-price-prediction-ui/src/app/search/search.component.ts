import { Component, inject } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Data } from '@angular/router';
import { CalculatorComponent } from '../calculator/calculator.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
  months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  years = ["2016", "2017", "2018", "2019", "2020", "2021", "2022"];

  searchForm = new FormGroup({
    features: new FormControl(''),
    fromMonth: new FormControl(''),
    fromYear: new FormControl(''),
    toMonth: new FormControl(''),
    toYear: new FormControl(''),
  });

  search() {
      //make call to dataService and return requested datas
      console.warn(this.searchForm.value);
  }

}
