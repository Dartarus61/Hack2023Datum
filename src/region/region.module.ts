import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { region } from 'src/models/region.model';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';

@Module({
  controllers: [RegionController],
  providers: [RegionService],
  imports: [SequelizeModule.forFeature([region])],
})
export class RegionModule {}
