import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Data } from 'src/schemas/data.schema';
import { Model } from 'mongoose';

@Injectable()
export class DataService {
  constructor(@InjectModel(Data.name) private dataModel: Model<Data>) {}

  async addData(
    country: string,
    model: string,
    cpi: Array<number>,
    crudeOil: Array<number>,
    oilProd: Array<number>,
    gasPrice: Array<number>,
    matrix: Array<number>,
    modelTrain: Array<number>,
    modelTest: Array<number>,
    error: Array<number>,
  ) {
    const newData = new this.dataModel({
      country,
      model,
      cpi,
      crudeOil,
      oilProd,
      gasPrice,
      matrix,
      modelTrain,
      modelTest,
      error,
    });
    await newData.save();
    return newData;
  }

  findAll() {
    return this.dataModel.find().exec();
  }

  getCountry() {
    return this.dataModel.find({}, { country: 1, _id: 0 });
  }

  getCPI() {
    return this.dataModel.find({}, { consumerPriceIndex: 1, _id: 0 });
  }

  getOilProduction() {
    return this.dataModel.find({}, { oilProduction: 1, _id: 0 });
  }

  getOilPrice() {
    return this.dataModel.find({}, { crudeOilPrice: 1, _id: 0 });
  }

  getGasPrice() {
    return this.dataModel.find({}, { gasPrice: 1, _id: 0 });
  }

  getMatrix() {
    return this.dataModel.find({}, { correlationMatrix: 1, _id: 0 });
  }

  getModelResultsTraining() {
    return this.dataModel.find({}, { modelResultsTraining: 1, _id: 0 });
  }

  getModelResultsTesting() {
    return this.dataModel.find({}, { modelResultsTesting: 1, _id: 0 });
  }

  findOne(id: number) {
    return `This action returns a #${id} data`;
  }

  remove(id: number) {
    return `This action removes a #${id} data`;
  }
}
