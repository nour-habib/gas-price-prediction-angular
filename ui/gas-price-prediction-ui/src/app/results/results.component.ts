import { Component, inject, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DataService } from '../../service/data.service';
import { ModelResults } from '../../model/model-results.interface';
import { Chart } from 'chart.js/auto';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatGridListModule, CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  dataService = inject(DataService);
  modelResults = new Array<ModelResults>;
  trainingResults = new Array<any>();
  testingResults = new Array<any>();
  trainingGraph: any = [];
  testingGraph: any = [];
  isClickedTraining = signal(false);
  isClickedTesting = signal(false);


  ngOnInit(): void {
    this.getAllResults();
    this.initializeTrainGraph();
    this.initializeTestGraph();
    Chart.defaults.color = '#fff';
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
    this.trainingGraph = new Chart('training', {
      type: 'line',
      data: {
        labels: Array.from(Array(60).keys()),
        datasets: [
          {
            data: this.trainingResults,
            borderColor: 'white',
            label:'Model Results',
            backgroundColor: '	#68c4af',
            borderDash: [1,1],
            
          },
          {
            data: this.modelResults[0].training_y,
            borderColor: '#b497e7',
            label: 'Actual Data ',
            backgroundColor: '#b497e7',
            showLine: false,
          },
        ]
      },
      options: {
        maintainAspectRatio: true,
        scales: {
          x: {
            
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Model Results on Training Data'
          },
        }
      }
    });
  }

  initializeTestGraph() {
    this.testingGraph = new Chart('testing', {
      type: 'line',
      data: {
        labels: Array.from(Array(20).keys()),
        datasets: [
          {
            data: this.testingResults,
            borderColor: 'orange',
            label: 'Model Results ',
            backgroundColor: 'yellow',
            borderDash: [5,5],
          },
          {
            data: this.modelResults[0].testing_y,
            borderColor: 'purple',
            label: 'Actual Data',
            backgroundColor: 'purple',
            showLine: false,
          },
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
            text: 'Model Results on Test Data'
          },
        }
      }
    });
  }
}
