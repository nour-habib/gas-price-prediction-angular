import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModelResults } from '../model/model-results.interface';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  http = inject(HttpClient);
  dataAPI = 'http://localhost:3000/data/';
  modelURL = 'http://localhost:3000/model-results';
  constructor() { }

  getCPI() {
    const url = this.dataAPI + `cpi`;
  
    return this.http.get(
      `${url}`,
    );
  }

  getOilProduction() {
    const url = this.dataAPI + `oilProduction`;
  
    return this.http.get(
      `${url}`,
    );
  }

  getCrudeOil() {
    const url = this.dataAPI + `crudeOilPrice`;
  
    return this.http.get(
      `${url}`,
    );
  }

  getGasPrice() {
    const url = this.dataAPI + `gasPrice`;
  
    return this.http.get(
      `${url}`,
    );
  }

  getModelResults() {
    const url = this.modelURL;
  
    return this.http.get<ModelResults>(
      `${url}`,
    );
  }


  getError() {
    const url = this.dataAPI + `/errorTest`;
  
    return this.http.get(
      `${url}`,
    );
  }

  getModelResultsTraining() {
    const url = this.modelURL + `/training`;
  
    return this.http.get(
      `${url}`,
    );
  }

  getModelResultsTesting() {
    const url = this.modelURL + `/testing`;
  
    return this.http.get(
      `${url}`,
    );
  }

}




