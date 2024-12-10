import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { DataService } from '../../service/data.service';
import { Chart } from 'chart.js/auto';
// import ScatterController from 'chart.js/dist';
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
  cpi = new Array<any>();
  oilProduction = new Array<any>();
  crudeOilPrice = new Array<any>();
  gasPrice = new Array<any>();
  correlationMatrix = new Array<any>();
  chart: any = [];

  ngOnInit(): void
  {
    this.getDataSet();
    this.initializeCPIgraph();
  }

  initializeCPIgraph() {

    this.chart = new Chart('canvas', {
      type: 'scatter',
      data: {
        labels: Array.from(Array(80).keys()),
        datasets: [
          {
            data: this.dataSet.map(data => data.consumerPriceIndex),
            borderColor: 'yellow',
            label: 'CPI',
            backgroundColor: 'orange',
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Consumer Price Index'
          }
        }
      }
    });
  }

  getDataSet() {
    this.dataService.getData().subscribe((data) => {
        this.dataSet = data;
        console.log("Data: ", this.dataSet);
        console.log("Data length: ", this.dataSet.length);
    });
  }

  getConsumerPriceIndex() {
    this.dataService.getCPI().subscribe((arr) => {
      this.cpi.push(arr);
      console.log("cpi: ", this.cpi);
    });
  }

  getOilProd() {
    this.dataService.getOilProduction().subscribe((arr) => {
      this.oilProduction.push(arr);
      console.log("oilProduction: ", this.oilProduction);
    });
  }

  getCrudeOil() {
    this.dataService.getCrudeOil().subscribe((arr) => {
      this.crudeOilPrice.push(arr);
      console.log("crudeOilPricee: ", this.crudeOilPrice);
    });
  }

  getGasPrices() {
    this.dataService.getGasPrice().subscribe((arr) => {
      this.gasPrice.push(arr);
      console.log("gasPrice: ", this.gasPrice);
    });
  }
}
