import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { DataService } from '../../service/data.service';
import { Chart } from 'chart.js/dist';
import ScatterController from 'chart.js/dist';
import {MatTabsModule} from '@angular/material/tabs'

@Component({
  selector: 'app-data-set-exploration',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatTabsModule],
  templateUrl: './data-set-exploration.component.html',
  styleUrl: './data-set-exploration.component.scss'
})
export class DataSetExplorationComponent {
  dataService = inject(DataService);
  cpi = new Array<any>();
  oilProduction = new Array<any>();
  crudeOilPrice = new Array<any>();
  gasPrice = new Array<any>();
  correlationMatrix = new Array<any>();

  ngOnInit(): void
  {
    this.getConsumerPriceIndex();
    this.getOilProd();
    this.getCrudeOil();
    this.getGasPrices();
    this.getCorrelationMatrix();
  }

  getConsumerPriceIndex() {
    this.dataService.getCPI().subscribe((arr) => {
      this.cpi.push(arr);
      console.log("cpi: ", this.cpi);
    });
  }

  getOilProd() {
    this.dataService.getOilProduction().subscribe((arr) => {
      this.oilProduction.push(arr);
      console.log("oilProduction: ", this.oilProduction);
    });
  }

  getCrudeOil() {
    this.dataService.getCrudeOil().subscribe((arr) => {
      this.crudeOilPrice.push(arr);
      console.log("crudeOilPricee: ", this.crudeOilPrice);
    });
  }

  getGasPrices() {
    this.dataService.getGasPrice().subscribe((arr) => {
      this.gasPrice.push(arr);
      console.log("gasPrice: ", this.gasPrice);
    });
  }

  getCorrelationMatrix() {
    this.dataService.getMatrix().subscribe((arr) => {
      this.correlationMatrix.push(arr);
      console.log("correlationMatrix: ", this.correlationMatrix);
    });
  }




}
