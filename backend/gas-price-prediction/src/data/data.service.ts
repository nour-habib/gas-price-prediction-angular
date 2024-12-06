import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Data } from 'src/schemas/data.schema';
import { Model } from 'mongoose';

@Injectable()
export class DataService {
  constructor(@InjectModel(Data.name) private dataModel: Model<Data>) {}

  findAll() {
    return this.dataModel.find().exec();
  }

  getCPI() {
    return this.dataModel.find({}, { consumerPriceIndex: 1 });
  }

  getOilProduction() {
    return this.dataModel.find({}, { oilProduction: 1 });
  }

  getOilPrice() {
    return this.dataModel.find({}, { crudeOilPrice: 1 });
  }

  getGasPrice() {
    return this.dataModel.find({}, { gasPrice: 1 });
  }

  findOne(id: number) {
    return `This action returns a #${id} data`;
  }

  remove(id: number) {
    return `This action removes a #${id} data`;
  }
}
