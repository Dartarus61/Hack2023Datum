import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { geoPoint } from 'src/models/geoPoint.model';
import { region } from 'src/models/region.model';
import { regionToGeoPoint } from 'src/models/regionToGeoPoint.model';

import { GeoPointController } from './geo-point.controller';
import { GeoPointService } from './geo-point.service';

@Module({
  controllers: [GeoPointController],
  providers: [GeoPointService],
  imports: [
    SequelizeModule.forFeature([geoPoint, region, regionToGeoPoint]),
    FilesModule,
  ],
})
export class GeoPointModule {}
