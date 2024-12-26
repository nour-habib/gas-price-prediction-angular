import { Component, inject } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  dataService = inject(DataService);
  dataSet = new Array<Data>;

  search(variable: string, month: string, year: string) {
      //make call to dataService and return requested datas
  }

}
