import { Component, inject, ViewChild, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { DataService } from '../../service/data.service';
import { MatTabsModule } from '@angular/material/tabs'
import { Data } from '../../model/data.interface';
import { MatGridListModule } from '@angular/material/grid-list';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  yaxis: ApexYAxis;
  colors: string[];
};

export type ChartOptions2 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
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
  title = 'Data Set Exploration';
  @ViewChild("chart") chart!: ChartComponent;
  public co!: Partial<ChartOptions2>;

  @ViewChild("gasChart") gasChart!: ChartComponent;
  public gasOption!: Partial<ChartOptions>;

  @ViewChild("cpiChart") cpiChart!: ChartComponent;
  public cpiOption!: Partial<ChartOptions>;

  @ViewChild("oilProdChart") oilProdChart!: ChartComponent;
  public oilProdOption!: Partial<ChartOptions>;

  @ViewChild("crudeOilChart") crudeOilChart!: ChartComponent;
  public crudeOilOption!: Partial<ChartOptions>;

  

  constructor() { }

  ngOnInit(): void
  {
    console.log("dataSetExploration component: ngOnInit()");
    this.getDataSet();
    setTimeout(() => this.initializeGasPriceGraph(), 3000);
    setTimeout(() => this.initializeCPIGraph(), 3000);
    setTimeout(() =>  this.initializeOilProdGraph(), 3000);
    setTimeout(() =>  this.initializeCrudeOilGraph(), 3000);
    //setTimeout(() =>  this.initializeBoxplot(), 3000);

    this.correlationMatrix = this.dataService.getMatrix();
  }

  async getDataSet() {
    console.log("dataSet exploration: getDataSet()");
    (await this.dataService.getData()).subscribe((data) => {
        this.dataSet = data;

        this.dataSet.sort((a,b) => {
          const ob1 = Date.parse(a['Date']);
          const ob2 = Date.parse(b['Date']);
          return ob1 - ob2;
      });

        console.log("dataSet Exploration: ", this.dataSet);
        this.cpi = this.dataSet.map(data => data.consumerPriceIndex);
        console.log("dataSet Exploration cpi: ", this.cpi);
        this.gasPrice = this.dataSet.map(data => data.gasPrice);
        console.log("gas priccee: ", this.gasPrice);
        this.oilProduction = this.dataSet.map(data => data.oilProduction);
        this.crudeOilPrice = this.dataSet.map(data => data.crudeOilPrice);
        this.date = this.dataSet.map(data => data.Date);
    });
    //   (await this.dataService.getData()).pipe(switchMap((data: any) => {
    //     return this.dataSet = data;
    // }));

  }

  initializeGasPriceGraph() {
    this.gasOption = {
      series: [
        {
          name: "Training",
          data: this.gasPrice,
        },
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 3,
        curve: "straight",
        colors: ["#45d6d4"]
        //dashArray: [2, 1],
      },
      title: {
        text: "Gas Price (USA)",
        align: "center",
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#fff'
        },
      },
      grid: {
        row: {
          colors: ["#3d3d3b", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: this.date
      },
      yaxis: {
        // min: 0,
        // max: 2,
        // //tickAmount: 0.001,
      }
    };
  
  }

  initializeCPIGraph(){
    this.cpiOption = {
      series: [
        {
          name: "CPI",
          data: this.cpi,
        },
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 3,
        curve: "straight",
        colors:["#fa8907"]
        //dashArray: [2, 1],
      },
      title: {
        text: "Consumer Price Index (USA)",
        align: "center",
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#fff'
        },
      },
      grid: {
        row: {
          colors: ["#3d3d3b", "transparent"],
          opacity: 0.5
        }
    
      },
      xaxis: {
        categories: this.date
      },
      yaxis: {
        // min: 0,
        // max: 2,
        // //tickAmount: 0.001,
      },
      colors: ["#FF1654"],
    };
  }

  initializeOilProdGraph(){
    this.oilProdOption = {
      series: [
        {
          name: "Oil Prod",
          data: this.oilProduction,
        },
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 3,
        curve: "straight",
        colors: ["#fa07c5"]
        //dashArray: [2, 1],
      },
      title: {
        text: "Oil Production (USA)",
        align: "center",
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#fff'
        },
      },
      grid: {
        row: {
          colors: ["#3d3d3b", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: this.date
      },
      yaxis: {
        // min: 0,
        // max: 2,
        // //tickAmount: 0.001,
      }
    };
  }

  initializeCrudeOilGraph(){
    this.crudeOilOption = {
      series: [
        {
          name: "Crude Oil",
          data: this.crudeOilPrice,
        },
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 3,
        curve: "straight",
        //dashArray: [2, 1],
      },
      title: {
        text: "Crude Oil Price (USA)",
        align: "center",
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#fff'
        },
      },
      grid: {
        row: {
          colors: ["#3d3d3b", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: this.date
      },
      yaxis: {
        // min: 0,
        // max: 2,
        // //tickAmount: 0.001,
      }
    };
  }

  // initializeGasPriceGraph() {
  //   console.log("init gas price");
  //   console.log("ggas: ", this.gasPrice);
  //   this.date = this.dataSet.map(data => data.Date);
  //  // Array.from(Array(80).keys())
  //  console.log("this.date: ", this.date);

  //   this.gasPriceGraph = new Chart('gasPrice', {
  //     type: 'line',
  //     data: {
  //       labels:Array.from(Array(80).keys()),
  //       datasets: [
  //         {
  //           data: this.gasPrice,
  //           borderColor: 'black',
  //           label: 'Gas Price',
  //           backgroundColor: 'blue',
  //         }
  //       ]
  //     },
  //     options: {
  //       maintainAspectRatio: true,
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           position: 'right',
  //         },
  //         title: {
  //           display: true,
  //           text: 'Gas Price'
  //         },
  //       }
  //     }
  //   });
  // }

  // initializeCPIgraph() {
  //   this.cpiGraph = new Chart('cpi', {
  //     type: 'scatter',
  //     data: {
  //       labels: this.dataSet.map(data => data.consumerPriceIndex),
  //       datasets: [
  //         {
  //           data: this.gasPrice,
  //           borderColor: 'yellow',
  //           label: 'CPI',
  //           backgroundColor: 'orange',
  //         }
  //       ]
  //     },
  //     options: {
  //       maintainAspectRatio: true,
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           position: 'right',
  //         },
  //         title: {
  //           display: true,
  //           text: 'Consumer Price Index vs. Gas Price'
  //         }
  //       }
  //     }
  //   });
  // }

  // initializeOilProdGraph() {
  //   this.oilProdGraph = new Chart('oilProd', {
  //     type: 'scatter',
  //     data: {
  //       labels: this.oilProduction,
  //       datasets: [
  //         {
  //           data: this.gasPrice,
  //           borderColor: 'yellow',
  //           label: 'Oil Production',
  //           backgroundColor: 'pink',
  //         }
  //       ]
  //     },
  //     options: {
  //       maintainAspectRatio: true,
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           position: 'right',
  //         },
  //         title: {
  //           display: true,
  //           text: 'Oil Production vs. Gas Price'
  //         }
  //       }
  //     }
  //   });
  // }

  // initializeCrudeOilGraph() {
  //   this.crudeOilGraph = new Chart('crudeOil', {
  //     type: 'scatter',
  //     data: {
  //       labels: this.dataSet.map(data => data.crudeOilPrice),
  //       datasets: [
  //         {
  //           data: this.gasPrice,
  //           borderColor: 'yellow',
  //           label: 'Crude Oil Price',
  //           backgroundColor: 'green',
  //         }
  //       ]
  //     },
  //     options: {
  //       maintainAspectRatio: true,
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           position: 'right',
  //         },
  //         title: {
  //           display: true,
  //           text: 'Crude Oil Price vs. Gas Price'
  //         }
  //       }
  //     }
  //   });
  // }

  randomValues(count: number, min:number, max:number) {
    const delta = max - min;
    return Array.from({length: count}).map(() => Math.random() * delta + min);
  }

  // initializeBoxplot() {
  //   console.log("initialize boxPlot");
  //  this.co = {
  //     series: [
  //       {
  //         name: 'Gas Price',
  //         type: 'boxPlot',
  //         data: [
  //           {
  //             x: new Date('2021-01-01').getTime(),
  //             y: this.gasPrice
  //           },
  //           // {
  //           //   x: new Date('2021-01-01').getTime(),
  //           //   y: [43, 65, 69, 76, 81]
  //           // },
  //           // {
  //           //   x: new Date('2021-01-01').getTime(),
  //           //   y: [31, 39, 45, 51, 59]
  //           // },
  //           // {
  //           //   x: new Date('2021-01-01').getTime(),
  //           //   y: [39, 46, 55, 65, 71]
        //     // },
        //     // {
        //     //   x: new Date('2021-01-01').getTime(),
        //     //   y: [29, 31, 35, 39, 44]
        //     // }
        //   ]
        // },
        // {
        //   name: 'outliers',
        //   type: 'scatter',
        //   data: [
        //     {
        //       x: new Date('2017-01-01').getTime(),
        //       y: 32
        //     },
        //     {
        //       x: new Date('2018-01-01').getTime(),
        //       y: 25
        //     },
        //     {
        //       x: new Date('2019-01-01').getTime(),
        //       y: 64
        //     },
        //     {
        //       x: new Date('2020-01-01').getTime(),
        //       y: 27
        //     },
        //     {
//               x: new Date('2020-01-01').getTime(),
//               y: 78
//             },
//             {
//               x: new Date('2021-01-01').getTime(),
//               y: 15
//             }
//           ]
//         }
//       ],
//       chart: {
//         height: 350,
//         type: "boxPlot"
//       },
//       //colors: ['#008FFB', '#FEB019'],
// title: {
//   text: 'BoxPlot - Scatter Chart',
//   align: 'left'
// },
// xaxis: {
//   //type: 'datetime',
//   // tooltip: {
//   //   formatter: function(val) {
//   //     return new Date(val).getFullYear()
//   //   }
//   // }
// },
// tooltip: {
//   shared: false,
//   intersect: true
// }
//     };
//   }

}