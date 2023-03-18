import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { GeoPointModule } from 'src/geo-point/geo-point.module';
import { quest } from 'src/models/quest.model';
import { quiz } from 'src/models/quiz.model';
import { region } from 'src/models/region.model';
import { QuizeModule } from 'src/quize/quiz.module';
import { QuestController } from './quest.controller';
import { QuestService } from './quest.service';

@Module({
  controllers: [QuestController],
  providers: [QuestService],
  imports: [
    SequelizeModule.forFeature([quest, quiz, region]),
    FilesModule,
    QuizeModule,
    GeoPointModule,
  ],
})
export class QuestModule {}
