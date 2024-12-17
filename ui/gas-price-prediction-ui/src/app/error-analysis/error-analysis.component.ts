import { Component, inject } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Chart } from 'chart.js/auto';
import { ModelResults } from '../../model/model-results.interface';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-error-analysis',
  standalone: true,
  imports: [MatGridListModule, MatCardModule],
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

  ngOnInit(): void {
    this.getErrorResults();
    this.initializeTrainGraph();
    this.initializeTestGraph();
  }

  getErrorResults() {
    this.dataService.getModelResults().subscribe((data) => {
      console.log("res: ", data);
      this.modelResults = data;
      this.errorTrain = this.modelResults[0].training;
      this.errorTest = this.modelResults[0].testing;
      this.train_y = this.modelResults[0].training_y;
      this.test_y = this.modelResults[0].training_y;
      console.log("train_y: ",  this.train_y);  
    });
  }

  initializeTrainGraph() {
    this.trainGraph = new Chart('train', {
      type: 'line',
      data: {
        labels: Array.from(Array(80).keys()),
        datasets: [
          {
            data: this.train_y,
            borderColor: 'black',
            label: 'Absolute Error on Training Data',
            backgroundColor: 'red',
          },
          {
            data: this.errorTrain,
            borderColor: 'black',
            label: 'Absolute Error on Training Data',
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
            text: 'Absolute sError Training'
          },
        }
      }
    });
  }

  initializeTestGraph() {

    this.testGraph = new Chart('test', {
      type: 'line',
      data: {
        labels:  Array.from(Array(80).keys()),
        datasets: [
          {
            data: this.test_y,
            borderColor: 'blue',
            label: 'Absolute Error on Test Data',
            backgroundColor: 'blue',
          },
          {
            data: this.errorTest,
            borderColor: 'grey',
            label: 'Absolute Error on Test Data',
            backgroundColor: 'grey',
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
            text: 'Absolute Error Test'
          },
        }
      }
    });
  }

}
