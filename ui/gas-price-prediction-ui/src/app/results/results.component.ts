import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  dataService = inject(DataService);
  trainingResults = new Array<any>();
  testingResults = new Array<any>();

  ngOnInit(): void {
    this.getTrainingResults();
    this.getTestingResults();
}

  getTrainingResults() {
    this.dataService.getModelResultsTraining().subscribe((arr) => {
      this.trainingResults.push(arr);
      console.log("training: ", this.trainingResults);
      console.log("arr: ", arr);
    });
  }

  getTestingResults() {
    this.dataService.getModelResultsTesting().subscribe((arr) => {
      this.testingResults.push(arr);
      console.log("testing: ", this.testingResults);
    });
  }
}
