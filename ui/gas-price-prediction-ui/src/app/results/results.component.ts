import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DataService } from '../../service/data.service';
import { ModelResults } from '../../model/model-results.interface';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
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

  ngOnInit(): void {
    this.getAllResults();
    this.initializeTrainGraph();
}

  getAllResults() {
    this.dataService.getModelResults().subscribe((results) => {
      this.modelResults = results;
      console.log("modelResults: ", this.modelResults);
      this.trainingResults = this.modelResults[0].training;
      this.testingResults = this.modelResults[0].testing;
    });
  }

  initializeTrainGraph() {
    this.trainingGraph = new Chart('training', {
      type: 'line',
      data: {
        labels: Array.from(Array(80).keys()),
        datasets: [
          {
            data: this.trainingResults,
            borderColor: 'black',
            label: 'Training Data ',
            backgroundColor: 'red',
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
            text: 'Model Results on Training Data'
          },
        }
      }
    });
  }
}
