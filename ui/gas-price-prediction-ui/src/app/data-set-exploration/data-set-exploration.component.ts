import { Component, inject, ViewChild } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { DataService } from '../../service/data.service';
import { Chart } from 'chart.js/auto';
// import { Chart } from 'chart.js/dist';
import { MatTabsModule } from '@angular/material/tabs'
import { Data } from '../../model/data.interface';
import { MatGridListModule } from '@angular/material/grid-list';
import 'chartjs-chart-matrix';

@Component({
  selector: 'app-data-set-exploration',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatTabsModule, MatGridListModule],
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
  oilProdGraph: any = [];
  crudeOilGraph: any = [];
  matrix: any = [];
  title = 'Data Set Exploration';

  constructor() { }

  ngOnInit(): void
  {
    this.getDataSet();
    this.initializeGasPriceGraph();
    this.initializeCPIgraph();
    this.initializeOilProdGraph();
    this.initializeCrudeOilGraph();
    this.initializeMatrix();
  }

  getDataSet() {
    this.dataService.getData().subscribe((data) => {
        this.dataSet = data;
        this.cpi = this.dataSet.map(data => data.consumerPriceIndex);
        this.gasPrice = this.dataSet.map(data => data.gasPrice);
        this.oilProduction = this.dataSet.map(data => data.oilProduction);
        this.date = this.dataSet.map(data => data.Date);
    });
  }

  initializeGasPriceGraph() {
    //console.log("ggas: ", this.gasPrice);
    this.date = this.dataSet.map(data => data.Date);
   // Array.from(Array(80).keys())
   console.log("this.date: ", this.date);

    this.gasPriceGraph = new Chart('gasPrice', {
      type: 'line',
      data: {
        labels:Array.from(Array(80).keys()),
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
          },
        }
      }
    });
  }

  initializeCPIgraph() {
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

  initializeOilProdGraph() {
    this.oilProdGraph = new Chart('oilProd', {
      type: 'scatter',
      data: {
        labels: this.oilProduction,
        datasets: [
          {
            data: this.gasPrice,
            borderColor: 'yellow',
            label: 'Oil Production',
            backgroundColor: 'pink',
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
            text: 'Oil Production vs. Gas Price'
          }
        }
      }
    });
  }

  initializeCrudeOilGraph() {
    this.crudeOilGraph = new Chart('crudeOil', {
      type: 'scatter',
      data: {
        labels: this.dataSet.map(data => data.crudeOilPrice),
        datasets: [
          {
            data: this.gasPrice,
            borderColor: 'yellow',
            label: 'Crude Oil Price',
            backgroundColor: 'green',
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
            text: 'Crude Oil Price vs. Gas Price'
          }
        }
      }
    });
  }

  initializeMatrix() {

    const matrixData = this.dataService.getMatrix();

    this.matrix = new Chart('matrix', {
      type: 'matrix',
      data: {
        datasets: [{
          label: 'Basic matrix',
          data: [{x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}],
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.5)',
          backgroundColor: 'rgba(200,200,0,0.3)',
          // width: ({chart}) => (chart.chartArea || {}).width / 2 - 1,
          // height: ({chart}) => (chart.chartArea || {}).height / 2 - 1,
        }],
      },
      options: {
        scales: {
          x: {
            display: false,
            min: 0.5,
            max: 2.5,
            offset: false
          },
          y: {
            display: false,
            min: 0.5,
            max: 2.5
          }
        }
      }
    });
  }
}
