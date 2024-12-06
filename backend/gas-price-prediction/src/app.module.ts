import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DataController } from './data/data.controller';
import { DataModule } from './data/data.module';
import { ModelResultsModule } from './model-results/model-results.module';

@Module({
  imports: [
    DataModule,
    MongooseModule.forRoot(
      'mongodb+srv://nour:TBrLgfxVm4salMHy@clusterthreads.4y7xc.mongodb.net/gas-price?retryWrites=true&w=majority&appName=ClusterThreads',
    ),
    ModelResultsModule,
  ],
  controllers: [AppController, DataController],
  providers: [AppService],
})
export class AppModule {}
