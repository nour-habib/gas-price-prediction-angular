import { Controller, Get } from '@nestjs/common';
import { DataService } from './data.service';

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
