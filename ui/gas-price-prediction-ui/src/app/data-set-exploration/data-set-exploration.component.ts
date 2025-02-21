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
  yaxis: ApexYAxis;
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
  //gasPriceGraph: any = [];
  //cpiGraph: any = [];
  //oilProdGraph: any = [];
  //crudeOilGraph: any = [];
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

  @ViewChild("allChart") allChart!: ChartComponent;
  public allVarsOption!: Partial<ChartOptions>;


  constructor() { }

  ngOnInit(): void
  {
    this.getDataSet();
    setTimeout(() => this.initializeGasPriceGraph(), 3000);
    setTimeout(() => this.initializeCPIGraph(), 3000);
    setTimeout(() =>  this.initializeOilProdGraph(), 3000);
    setTimeout(() =>  this.initializeCrudeOilGraph(), 3000);
    setTimeout(() =>  this.initializeBoxplot(), 3000);
    setTimeout(() =>  this.initializeVariablesGraph(), 3000);

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
        text: "Gas Price",
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
        categories: this.date,
        labels: {
          show: true,
          style: {
              colors: '#999',
              fontSize: '8px',
              //cssClass: 'apexcharts-xaxis-label',
          },
        }
      },
      yaxis: {
        labels: {
          show: true,
          style: {
              colors: '#999',
              fontSize: '8px',
              //cssClass: 'apexcharts-xaxis-label',
          },
        }
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
        text: "Consumer Price Index",
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
        categories: this.date,
        labels: {
          show: true,
          style: {
              colors: '#999',
              fontSize: '8px',
              //cssClass: 'apexcharts-xaxis-label',
          },
        }
      },
      yaxis: {
        labels: {
          show: true,
          style: {
              colors: '#999',
              fontSize: '8px',
              //cssClass: 'apexcharts-xaxis-label',
          },
        }
      },
      colors: ["#FF1654"],
    };
  }

  initializeOilProdGraph(){
    this.oilProdOption = {
      series: [
        {
          name: "Oil production (barrels)",
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
        text: "Oil Production",
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
        categories: this.date,
        labels: {
          show: true,
          style: {
              colors: '#999',
              fontSize: '8px',
              //cssClass: 'apexcharts-xaxis-label',
          },
        }
      },
      yaxis: {
        labels: {
          show: true,
          style: {
              colors: '#999',
              fontSize: '8px',
              //cssClass: 'apexcharts-xaxis-label',
          },
        }
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
        text: "Crude Oil Price",
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
        categories: this.date,
        labels: {
          show: true,
          style: {
              colors: '#999',
              fontSize: '8px',
              //cssClass: 'apexcharts-xaxis-label',
          },
        }
      },
      yaxis: {
        labels: {
          show: true,
          style: {
              colors: '#999',
              fontSize: '8px',
              //cssClass: 'apexcharts-xaxis-label',
          },
        }
      }
    };
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
          name: 'Gas Price',
          type: 'boxPlot',
          data: [
            {
              x: 1,
              y: this.gasPrice
            },
          ]
        },
        {
          name: 'Outliers',
          type: 'scatter',
          data: [
            {
              x: 1,
              y: 1.7801
            },
            {
              x: 1,
              y: 1.6514
            },
            {
              x: 1,
              y: 1.529
            },
            {
              x: 1,
              y: 1.4904
            },
            {
              x: 1,
              y: 1.4458
            }
          ]
        }
      ],
      chart: {
        height: 500,
        type: "boxPlot"
      },
      //colors: ['#008FFB', '#FEB019'],
title: {
  text: 'BoxPlot - Gas Price',
  align: 'center',
  style: {
    fontSize:  '14px',
    fontWeight:  'bold',
    fontFamily:  undefined,
    color:  '#fff'
  },
},
xaxis: {
  labels: {
    show: true,
    style: {
        colors: '#fff',
        fontSize: '8px',
        //cssClass: 'apexcharts-xaxis-label',
    },
  }
},
yaxis: {
  labels: {
    show: true,
    style: {
        colors: '#fff',
        fontSize: '8px',
        //cssClass: 'apexcharts-xaxis-label',
    },
  }
},
tooltip: {
  shared: false,
  intersect: true
}
    };
  }

  initializeVariablesGraph(){
    this.allVarsOption = {
      series: [
        {
          name: "Gas Price",
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
        colors: ["#1f48a6"],
        //dashArray: [2, 1],
      },
      title: {
        text: "Oil Production & Gas Price",
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
        categories: this.crudeOilPrice,
        labels: {
          show: true,
          style: {
              colors: '#999',
              fontSize: '8px',
              //cssClass: 'apexcharts-xaxis-label',
          },
        }
      },
      yaxis: {
        labels: {
          show: true,
          style: {
              colors: '#999',
              fontSize: '8px',
              //cssClass: 'apexcharts-xaxis-label',
          },
        }
      }
    };
  }

} 