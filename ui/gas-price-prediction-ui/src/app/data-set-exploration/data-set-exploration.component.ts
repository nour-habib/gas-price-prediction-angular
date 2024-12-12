import { Component, inject, ViewChild } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { DataService } from '../../service/data.service';
import { Chart } from 'chart.js/auto';
import {MatTabsModule} from '@angular/material/tabs'
import { Data } from '../../model/data.interface';
import {MatGridListModule} from '@angular/material/grid-list'

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
  title = 'Data Set Exploration';

  // chartAreaBorder = {
  //   id: 'chartAreaBorder',
  //   beforeDraw(chart: { ctx: any; chartArea: { left: any; top: any; width: any; height: any; }; }, args: any, options: { borderColor: any; borderWidth: any; borderDash: any; borderDashOffset: any; }) {
  //     const {ctx, chartArea: {left, top, width, height}} = chart;
  //     ctx.save();
  //     ctx.strokeStyle = options.borderColor;
  //     ctx.lineWidth = options.borderWidth;
  //     ctx.setLineDash(options.borderDash || []);
  //     ctx.lineDashOffset = options.borderDashOffset;
  //     ctx.strokeRect(left, top, width, height);
  //     ctx.restore();
  //   }
  // };

  constructor() { }

  ngOnInit(): void
  {
    this.getDataSet();
    this.initializeGasPriceGraph();
    this.initializeCPIgraph();
    this.initializeOilProdGraph();
    this.initializeCrudeOilGraph();
    
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
      type: 'scatter',
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

}
