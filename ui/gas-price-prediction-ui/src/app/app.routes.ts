import { Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { DataSetExplorationComponent } from './data-set-exploration/data-set-exploration.component';
import { ErrorAnalysisComponent } from './error-analysis/error-analysis.component';
import { ModelComponent } from './model/model.component';
import { SearchComponent } from './search/search.component';
import { MainComponent } from './main/main.component';
import { dataResolver } from './data.resolver';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
    }, 
    {
        path: 'search',
        component: SearchComponent,
    },
    {
        path: 'results',
        component: ResultsComponent,
    },

    {
        path: 'dataSetExploration',
        runGuardsAndResolvers: "always",
        component: DataSetExplorationComponent,
        resolve: [dataResolver],
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
