import { Module } from '@nestjs/common';
import { QuizeModule } from './quize/quize.module';
import { GeoPointModule } from './geo-point/geo-point.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { geoPoint } from './models/geoPoint.model';
import { region } from './models/region.model';
import { quiz } from './models/quiz.model';
import { regionToGeoPoint } from './models/regionToGeoPoint.model';
import { quest } from './models/quest.model';
import { QuestModule } from './quest/quest.module';
import { RegionModule } from './region/region.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'datum',
      models: [geoPoint, region, quiz, regionToGeoPoint, quest],
      autoLoadModels: true,
      sync: { alter: true },
      /* dialectOptions:{
          ssl:{
              require: true,
              rejectUnauthorized: false,
          }
      } */
    }),
    QuizeModule,
    GeoPointModule,
    QuestModule,
    RegionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
