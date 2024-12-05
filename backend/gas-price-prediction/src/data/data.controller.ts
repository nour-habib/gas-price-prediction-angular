/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { DataService } from './data.service';
import { Data } from 'src/schemas/data.schema';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get('/country')
  getCountry() {
    return this.dataService.getCountry();
  }

  @Get('/cpi')
  getCPI() {
    return this.dataService.getCPI();
  }

  @Get('/oilProduction')
  getOilProduction() {
    return this.dataService.getOilProduction();
  }

  @Get('/crudeOilPrice')
  getCrudeOilPrice() {
    return this.dataService.getOilPrice();
  }

  @Get('/gasPrice')
  getGasPrice() {
    return this.dataService.getGasPrice();
  }

  @Get('/correlationMatrix')
  getCorrelationMatrix() {
    return this.dataService.getMatrix();
  }

  @Get('/modelResultsTrain')
  getModelResultsTraining() {
    return this.dataService.getModelResultsTraining();
  }

  @Get('/modelResultsTest')
  getModelResultsTesting() {
    return this.dataService.getModelResultsTesting();
  }

  @Post('/create')
  async create(
    @Body('country') country: string,
    @Body('model') model: string,
    @Body('consumerPriceIndex') cpi: Array<number>,
    @Body('crudeOilPrice') crudeOil: Array<number>,
    @Body('oilProduction') oilProd: Array<number>,
    @Body('gasPrice') gasPrice: Array<number>,
    @Body('matrix') correlationMatrix: Array<number>,
    @Body('modelResultsTraining') modelResultsTraining: Array<number>,
    @Body('modelResultsTesting') modelResultsTesting: Array<number>,
    @Body('errorResults') errorResults: Array<number>,
  ) {
    const result = await this.dataService.addData(
      country,
      model,
      cpi,
      crudeOil,
      oilProd,
      gasPrice,
      correlationMatrix,
      modelResultsTraining,
      modelResultsTesting,
      errorResults,
    );
    return {
      msg: 'Data successfully added',
      dataId: result.id,
    };
  }

  @Get()
  findAll() {
    return this.dataService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.dataService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.dataService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dataService.remove(+id);
  // }
}
