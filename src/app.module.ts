import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizeModule } from './quize/quize.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), QuizeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
