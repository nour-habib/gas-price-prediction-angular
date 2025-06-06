import { Component, inject, ViewChild,ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, RouterModule, ActivatedRoute } from '@angular/router';
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
import { CommonModule } from '@angular/common';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatTabsModule, MatGridListModule, NgApexchartsModule,CommonModule],
  templateUrl: './data-set-exploration.component.html',
  styleUrl: './data-set-exploration.component.scss'
})
export class DataSetExplorationComponent {
  dataService = inject(DataService);
  dataSet: Data[] = [];
  cpi: Array<number> = [];  
  oilProduction: Array<number> = [];
  crudeOilPrice: Array<number> = [];
  gasPrice: Array<number> = [];
  date: Array<string> = [];
  correlationMatrix: Array<number> = [];
 
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

  constructor(private activatedRoute: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void
  {
    this.getDataSet();
    this.initializeGasPriceGraph();
    this.initializeCPIGraph();
    this.initializeOilProdGraph();
    this.initializeCrudeOilGraph();
    this.initializeBoxplot();
    this.initializeVariablesGraph();
    this.correlationMatrix = this.dataService.getMatrix();
  }


  getDataSet() {
      this.activatedRoute.data.subscribe((data) => {

       this.dataSet = data[0];
       this.changeDetectorRef.markForCheck();
        
        this.dataSet.sort((a,b) => {
          const ob1 = Date.parse(a['Date']);
          const ob2 = Date.parse(b['Date']);
          return ob1 - ob2;
      });

        this.cpi = this.dataSet.map(data => data.consumerPriceIndex);
        this.gasPrice = this.dataSet.map(data => data.gasPrice);
        this.oilProduction = this.dataSet.map(data => data.oilProduction);
        this.crudeOilPrice = this.dataSet.map(data => data.crudeOilPrice);
        this.date = this.dataSet.map(data => data.Date);

        //this.changeDetectorRef.detectChanges();
    });  
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
        height: 380,
        type: "line",
        zoom: {
          enabled: true
        },
        toolbar: {
          tools:{
            download: true
          }
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
          color:  '#43e8d8'
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
        title: {
          text: "Date",
          style: {
            color: "#fff",
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
        },
        },
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
        },
        title: {
          text: "Gas Price",
          style: {
            color: '#fff',
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
        },
        },
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
        height: 380,
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
          color:  '#43e8d8'
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
        title: {
          text: "Date",
          style: {
            color: "#fff",
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
        },
        },
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
        title: {
          text: "CPI",
          style: {
            color: "#fff",
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
        },
        },
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
        height: 380,
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
          color:  '#43e8d8'
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
        title: {
          text: "Date",
          style: {
            color:"#fff",
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
        },
        },
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
        title: {
          text: "Oil Production (barrels)",
          style: {
            color: "#fff",
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
        },
        },
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
        height: 380,
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
          color:  '#43e8d8'
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
        title: {
          text: "Date",
          style: {
            color: "#fff",
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
        },
        },
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
        title: {
          text: "Crude Oil Price",
          style: {
            color: "#fff",
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
        },
        },
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

  initializeBoxplot() {
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
        height: 400,
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
    color:  '#43e8d8#fff'
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
        height: 400,
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
        colors: ["#7adedc"],
        //dashArray: [2, 1],
      },
      title: {
        text: "Crude Oil Price & Gas Price",
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
          opacity: 0.5,
        }
      },
      xaxis: {
        categories: this.crudeOilPrice,
        stepSize: 20,
        title: {
          text: "Crude Oil Price",
          style: {
            color: "#fff",
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
        },
        },
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
        title: {
          text: "Gas Price",
          style: {
            color: "#fff",
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
        },
        },
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