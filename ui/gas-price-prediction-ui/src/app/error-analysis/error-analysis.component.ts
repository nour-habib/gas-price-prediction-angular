import { Component, inject } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-error-analysis',
  standalone: true,
  imports: [],
  templateUrl: './error-analysis.component.html',
  styleUrl: './error-analysis.component.scss'
})
export class ErrorAnalysisComponent {
  dataService = inject(DataService);
  errorResults = new Array<any>();

  ngOnInit(): void {
    this.getErrorResults();
  }

  getErrorResults() {
    this.dataService.getError().subscribe((arr) => {
      this.errorResults.push(arr);
    })
  }

}
