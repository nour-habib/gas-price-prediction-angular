/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get } from '@nestjs/common';
import { DataService } from './data.service';
import { Data } from 'src/schemas/data.schema';

@Controller(Data.name)
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  getData() {
    return this.dataService.findAll();
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
