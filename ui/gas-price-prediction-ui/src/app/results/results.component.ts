import { Component, inject, signal, ViewEncapsulation, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DataService } from '../../service/data.service';
import { ModelResults } from '../../model/model-results.interface';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
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

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatGridListModule, CommonModule, MatCardModule, NgApexchartsModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ResultsComponent {
  dataService = inject(DataService);
  modelResults = new Array<ModelResults>;
  trainingResults = new Array<number>();
  testingResults = new Array<any>();
  trainingGraph: any = [];
  testingGraph: any = [];
  isClickedTraining = signal(false);
  isClickedTesting = signal(false);

  @ViewChild("trainChart") trainChart!: ChartComponent;
  public trainOption!: Partial<ChartOptions>;

  @ViewChild("testChart") testChart!: ChartComponent;
  public testOption!: Partial<ChartOptions>;


  ngOnInit(): void {
    this.getAllResults();
    this.initializeTrainGraph();
    this.initializeTestGraph();
    
    console.log("trainingResults Max: ", Math.max(...this.trainingResults));
    console.log("trainResult_Y Max: ", Math.max(... this.modelResults[0].training_y));
}

  getAllResults() {
    this.dataService.getModelResults().subscribe((results) => {
      this.modelResults = results;
      console.log("modelResults: ", this.modelResults);
      this.trainingResults = this.modelResults[0].training;
      this.testingResults = this.modelResults[0].testing;
    });
  }

  toggleExpandedTraining() {
    this.isClickedTraining.set(!this.isClickedTraining);
  }

  toggleExpandedTesting() {
    this.isClickedTesting.set(!this.isClickedTesting);
  }

  initializeTrainGraph() {
    this.trainOption = {
      series: [
        {
          name: "Model Results",
          data: this.trainingResults,
        },
        {
          name: "Actual data",
          data: this.modelResults[0].training_y,
        },
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
        width: 3,
        curve: "straight",
        //dashArray: [8, 5],
      },
      title: {
        text: "Model Results Training Data",
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
        categories: Array.from(Array(60).keys())
      },
      yaxis: {
        // min: 0,
        // max: 2,
        // //tickAmount: 0.001,
      }
   };
  }

  initializeTestGraph() {
    this.testOption = {
      series: [
        {
          name: "Model Results",
          data: this.testingResults,
        },
        {
          name: "Actual test data",
          data: this.modelResults[0].testing_y,
        },
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
        width: 3,
        curve: "straight",
        //dashArray: [2, 1],
      },
      title: {
        text: "Model Results Testing Data",
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
        categories: Array.from(Array(60).keys())
      },
      yaxis: {
        // min: 0,
        // max: 2,
        // //tickAmount: 0.001,
      }
   };
      
  }
}
