import { Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { DataSetExplorationComponent } from './data-set-exploration/data-set-exploration.component';
import { ErrorAnalysisComponent } from './error-analysis/error-analysis.component';
import { ModelComponent } from './model/model.component';

export const routes: Routes = [
    {
        path: '',
        component: ResultsComponent,
    }, 

    {
        path: 'dataSetExploration',
        component: DataSetExplorationComponent,
    },
    {
        path: 'model',
        component: ModelComponent,
    },
    {
        path: 'errorAnalysis',
        component: ErrorAnalysisComponent,
    }
];
