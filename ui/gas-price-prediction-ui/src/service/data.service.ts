import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  http = inject(HttpClient);
  api = 'http://localhost:3000/data/';
  constructor() { }

  getCPI() {
    const url = this.api + `cpi`;
  
    return this.http.get(
      `${url}`,
    );
  }

  getOilProduction() {
    const url = this.api + `oilProduction`;
  
    return this.http.get(
      `${url}`,
    );
  }

  getCrudeOil() {
    const url = this.api + `crudeOilPrice`;
  
    return this.http.get(
      `${url}`,
    );
  }

  getGasPrice() {
    const url = this.api + `gasPrice`;
  
    return this.http.get(
      `${url}`,
    );
  }

  getMatrix() {
    const url = this.api + `correlationMatrix`;
  
    return this.http.get(
      `${url}`,
    );
  }

  getModelResultsTraining() {
    const url = this.api + `modelResultsTrain`;
  
    return this.http.get(
      `${url}`,
    );
  }

  getModelResultsTesting() {
    const url = this.api + `modelResultsTest`;
  
    return this.http.get(
      `${url}`,
    );
  }
}




