import { Component, inject, ViewChild, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { DataService } from '../../service/data.service';
import { Chart, LinearScale, CategoryScale } from 'chart.js';
// import { Chart } from 'chart.js/dist';
import { MatTabsModule } from '@angular/material/tabs'
import { Data } from '../../model/data.interface';
import { MatGridListModule } from '@angular/material/grid-list';
//import 'chartjs-chart-matrix';
// import { ChartConfiguration } from 'chart.js/auto';
import { Legend } from 'chart.js/auto';
import { BoxPlotController, BoxAndWiskers, BoxPlotDataPoint } from '@sgratzl/chartjs-chart-boxplot';
import ApexCharts from 'apexcharts';
import {
  ChartComponent,
  ApexChart,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexTooltip
} from "ng-apexcharts";
import { NgApexchartsModule } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis,
  tooltip: ApexTooltip,
  plotOptions: ApexPlotOptions;
  colors: string[]
};

@Component({
  selector: 'app-data-set-exploration',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatTabsModule, MatGridListModule, NgApexchartsModule],
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
  correlationMatrix: Array<number> = [];
  gasPriceGraph: any = [];
  cpiGraph: any = [];
  oilProdGraph: any = [];
  crudeOilGraph: any = [];
  matrix: any = [];
  boxplot: any = [];
  title = 'Data Set Exploration';
  @ViewChild("chart")
  chart!: ChartComponent;
  public co!: Partial<ChartOptions>;

  constructor() { }

  ngOnInit(): void
  {
    console.log("dataSetExploration component: ngOnInit()");
    this.getDataSet();
    this.initializeGasPriceGraph();
    this.initializeCPIgraph();
    this.initializeOilProdGraph();
    this.initializeCrudeOilGraph();
    //this.initializeMatrix();
    this.initializeBoxplot();

    this.correlationMatrix = this.dataService.getMatrix();
    console.log("matrix: ", this.correlationMatrix);
  }

  async getDataSet() {
    (await this.dataService.getData()).subscribe((data) => {
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

  randomValues(count: number, min:number, max:number) {
    const delta = max - min;
    return Array.from({length: count}).map(() => Math.random() * delta + min);
  }

  initializeBoxplot() {
    console.log("initialize boxPlot");
   this.co = {
      series: [
        {
          name: 'box',
          type: 'boxPlot',
          data: [
            {
              x: new Date('2017-01-01').getTime(),
              y: [54, 66, 69, 75, 88]
            },
            {
              x: new Date('2018-01-01').getTime(),
              y: [43, 65, 69, 76, 81]
            },
            {
              x: new Date('2019-01-01').getTime(),
              y: [31, 39, 45, 51, 59]
            },
            {
              x: new Date('2020-01-01').getTime(),
              y: [39, 46, 55, 65, 71]
            },
            {
              x: new Date('2021-01-01').getTime(),
              y: [29, 31, 35, 39, 44]
            }
          ]
        },
        {
          name: 'outliers',
          type: 'scatter',
          data: [
            {
              x: new Date('2017-01-01').getTime(),
              y: 32
            },
            {
              x: new Date('2018-01-01').getTime(),
              y: 25
            },
            {
              x: new Date('2019-01-01').getTime(),
              y: 64
            },
            {
              x: new Date('2020-01-01').getTime(),
              y: 27
            },
            {
              x: new Date('2020-01-01').getTime(),
              y: 78
            },
            {
              x: new Date('2021-01-01').getTime(),
              y: 15
            }
          ]
        }
      ],
      chart: {
        height: 350,
        type: "boxPlot"
      },
      colors: ['#008FFB', '#FEB019'],
title: {
  text: 'BoxPlot - Scatter Chart',
  align: 'left'
},
xaxis: {
  //type: 'datetime',
  // tooltip: {
  //   formatter: function(val) {
  //     return new Date(val).getFullYear()
  //   }
  // }
},
tooltip: {
  shared: false,
  intersect: true
}
    };
  




  }

}