import { ResolveFn } from '@angular/router';
import { DataService } from '../service/data.service';
import { inject } from '@angular/core';
import { Data } from '@angular/router';

export const dataResolver: ResolveFn<Data> = (route, state) => {
  console.log("Resolver()");
  return inject(DataService).getData();
 
};
