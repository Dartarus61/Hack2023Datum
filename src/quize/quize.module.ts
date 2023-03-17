import { Module } from '@nestjs/common';
import { QuizeService } from './quize.service';
import { QuizeController } from './quize.controller';

@Module({
  providers: [QuizeService],
  controllers: [QuizeController]
})
export class QuizeModule {}
