import { Component, inject, ViewChild } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { DataService } from '../../service/data.service';
import { Chart } from 'chart.js/auto';
import {MatTabsModule} from '@angular/material/tabs'
import { Data } from '../../model/data.interface';

@Component({
  selector: 'app-data-set-exploration',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatTabsModule],
  templateUrl: './data-set-exploration.component.html',
  styleUrl: './data-set-exploration.component.scss'
})
export class DataSetExplorationComponent {
  dataService = inject(DataService);
  dataSet = new Array<Data>;
  cpi: Array<number> = [];
  oilProduction: Array<number> = [];
  crudeOilPrice: Array<number> = [];
  gasPrice: Array<number> = [];
  date: Array<string> = [];
  correlationMatrix = new Array<any>();
  gasPriceGraph: any = [];
  cpiGraph: any = [];

  constructor() { }

  ngOnInit(): void
  {
    this.getDataSet();
    this.initializeGasPriceGraph();
    this.initializeCPIgraph();

    
  }

  initializeGasPriceGraph() {
    //console.log("ggas: ", this.gasPrice);
    this.date = this.dataSet.map(data => data.Date);
   // Array.from(Array(80).keys())
   console.log("this.date: ", this.date);

    this.gasPriceGraph = new Chart('gasPrice', {
      type: 'scatter',
      data: {
        labels: this.date,
        datasets: [
          {
            data: this.gasPrice,
            borderColor: 'black',
            label: 'Gas Price',
            backgroundColor: 'blue',
          }
        ]
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Gas Price'
          }
        }
      }
    });
  }

  initializeCPIgraph() {
   // this.gasPriceGraph.destroy();

    this.cpiGraph = new Chart('cpi', {
      type: 'scatter',
      data: {
        labels: this.dataSet.map(data => data.consumerPriceIndex),
        datasets: [
          {
            data: this.gasPrice,
            borderColor: 'yellow',
            label: 'CPI',
            backgroundColor: 'orange',
          }
        ]
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Consumer Price Index vs. Gas Price'
          }
        }
      }
    });
  }

  getDataSet() {
    this.dataService.getData().subscribe((data) => {
        this.dataSet = data;
        this.cpi = this.dataSet.map(data => data.consumerPriceIndex);
        this.gasPrice = this.dataSet.map(data => data.gasPrice);
        this.oilProduction = this.dataSet.map(data => data.oilProduction);
        this.date = this.dataSet.map(data => data.Date);
        //console.log("oilProd: ", this.oilProduction);
       // console.log("d: ", this.dataSet.map(data => data.Date));
      // console.log("dataSet: ", this.dataSet);
    });
  }
}
