import { ResolveFn } from '@angular/router';
import { ModelResults } from '../model/model-results.interface';
import { DataService } from '../service/data.service';
import { inject } from '@angular/core';

export const modelResultsResolver: ResolveFn<ModelResults[]> = (route, state) => {
  console.log("ModelResults Resolver()");
  return inject(DataService).getModelResults();
};
