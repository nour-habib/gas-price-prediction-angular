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


  ngOnInit(): void {
    this.getErrorResults();
    setTimeout(() => this.initializeTrainGraph(), 3000);
  }

  getErrorResults() {
    this.dataService.getModelResults().subscribe((data) => {
      //console.log("res: ", data);
      this.modelResults = data;
      this.errorTrain = this.modelResults[0].errorTrain;
      this.errorTest = this.modelResults[0].errorTest;
      this.train_y = this.modelResults[0].training_y;
      this.test_y = this.modelResults[0].training_y;
      //console.log("train_y: ",  this.train_y);  
    });
  }
  
  initializeTrainGraph() {
    this.trainOps = {
      series: [
        {
          name: "Test",
          data: this.errorTest,
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
        align: "center",
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#fff'
        },
      },
      grid: {
        borderColor: "#f1f1f1"
      },
      xaxis: {
        //categories: Array.from(Array(60).keys())
      },
      yaxis: {
        min: 0,
        max: 0.5,
        //tickAmount: 0.001,
      }
    };
  }
}
