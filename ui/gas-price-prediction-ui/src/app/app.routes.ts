import { Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { DataSetExplorationComponent } from './data-set-exploration/data-set-exploration.component';
import { ErrorAnalysisComponent } from './error-analysis/error-analysis.component';

export const routes: Routes = [
    {
        path: 'main',
        component: ResultsComponent,
    }, 

    {
        path: 'dataSetExploration',
        component: DataSetExplorationComponent,
    },
    {
        path: 'errorAnalysis',
        component: ErrorAnalysisComponent,
    }
];
