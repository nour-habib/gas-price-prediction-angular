import { Component, inject, ViewChild } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Chart } from 'chart.js/auto';
import { ModelResults } from '../../model/model-results.interface';
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
};

@Component({
  selector: 'app-error-analysis',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './error-analysis.component.html',
  styleUrl: './error-analysis.component.scss'
})
export class ErrorAnalysisComponent {
  dataService = inject(DataService);
  modelResults = new Array<ModelResults>;
  errorTest: Array<number> = [];
  errorTrain: Array<number> = [];
  train_y: Array<number> = [];
  test_y: Array<number> = [];
  trainGraph: any = [];
  testGraph: any = [];
  @ViewChild("chart") chart!: ChartComponent;
  public trainOps!: Partial<ChartOptions>;

  @ViewChild("testChart") testChart!: ChartComponent;
  public testOps!: Partial<ChartOptions>;

  ngOnInit(): void {
    this.getErrorResults();
    setTimeout(() => this.initializeTrainGraph(), 3000);
    setTimeout(() => this.initializeTestGraph(), 3000);
  }

  getErrorResults() {
    this.dataService.getModelResults().subscribe((data) => {
      //console.log("res: ", data);
      this.modelResults = data;
      this.errorTrain = this.modelResults[0].training;
      this.errorTest = this.modelResults[0].testing;
      this.train_y = this.modelResults[0].training_y;
      this.test_y = this.modelResults[0].training_y;
      //console.log("train_y: ",  this.train_y);  
    });
  }
  
  initializeTrainGraph() {
    this.trainOps = {
      series: [
        {
          name: "Training",
          data: this.train_y,
        },
        {
          name: "Training",
          data: this.errorTrain
        }
      ],
      chart: {
        //height: 350,
        type: "line",
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [2,2],
        curve: "straight",
        //dashArray: [2, 1],
      },
      title: {
        text: "Absolute Error (Training)",
        align: "left"
      },
      grid: {
        borderColor: "#f1f1f1"
      },
      xaxis: {
        categories: Array.from(Array(60).keys())
      },
      yaxis: {
        min: 0,
        max: 2,
        //tickAmount: 0.001,
      }
    };

  }

  initializeTestGraph() {
    this.testOps = {
      series: [
        {
          name: "Training",
          data: this.test_y,
        },
        {
          name: "Training",
          data: this.errorTest
        }
      ],
      chart: {
        //height: 350,
        type: "line",
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [2,2],
        curve: "straight",
        //dashArray: [2, 1],
      },
      title: {
        text: "Absolute Error (Testing)",
        align: "left"
      },
      grid: {
        borderColor: "#f1f1f1"
      },
      xaxis: {
        categories: Array.from(Array(60).keys())
      },
      yaxis: {
        min: 0,
        max: 2,
        //tickAmount: 0.001,
      }
    };

  }

}
