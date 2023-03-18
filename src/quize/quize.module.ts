import { Module } from '@nestjs/common';
import { QuizeService } from './quize.service';
import { QuizeController } from './quiz.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { quest } from 'src/models/quest.model';
import { quiz } from 'src/models/quiz.model';
import { FilesModule } from 'src/files/files.module';
import { region } from 'src/models/region.model';

@Module({
  providers: [QuizeService],
  controllers: [QuizeController],
  exports: [QuizeService],
  imports: [SequelizeModule.forFeature([quest, quiz, region]), FilesModule],
})
export class QuizeModule {}
