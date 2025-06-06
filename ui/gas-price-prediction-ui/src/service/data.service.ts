import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModelResults } from '../model/model-results.interface';
import { Data } from '../model/data.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  http = inject(HttpClient);
  dataAPI = 'http://localhost:3000/data';
  modelURL = 'http://localhost:3000/model-results';
  correlationMatrix = [1, 0.3853, 0.7775, 0.9609,
                        0.3853, 1, 0.6038, 0.4235, 
                        0.775, 0.6038, 1, 0.8479, 
                        0.9609, 0.4235,0.8479, 1];

  constructor() { }


  getData(): Observable<Data[]> {
    const url = this.dataAPI;
    
    return this.http.get<Data[]>(
      `${url}`,
    );
  }

  getModelResults(): Observable<ModelResults[]>{
    const url = this.modelURL;
  
    return this.http.get<ModelResults[]>(
      `${url}`,
    );
  }

  getCPI() {
    const url = this.dataAPI + `/cpi`;
  
    return this.http.get(
      `${url}`,
    );
  }

  getOilProduction() {
    const url = this.dataAPI + `/oilProduction`;
  
    return this.http.get(
      `${url}`,
    );
  }

  getCrudeOil() {
    const url = this.dataAPI + `/crudeOilPrice`;
  
    return this.http.get(
      `${url}`,
    );
  }

  getGasPrice() {
    const url = this.dataAPI + `/gasPrice`;
  
    return this.http.get(
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

  getMatrix() {
    return this.correlationMatrix;
  }

}




