import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { DataSchema } from 'src/schemas/data.schema';
import { Data } from 'src/schemas/data.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Data.name, schema: DataSchema }]),
  ],
  controllers: [DataController],
  providers: [DataService],
  exports: [DataService],
})
export class DataModule {}
