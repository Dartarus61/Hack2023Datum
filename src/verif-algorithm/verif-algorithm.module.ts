import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { answerInfo } from 'src/models/answerInfo.model';
import { quest } from 'src/models/quest.model';
import { quiz } from 'src/models/quiz.model';
import { quizUserTable } from 'src/models/userToQuiz.model';
import { QuestModule } from 'src/quest/quest.module';
import { QuizeModule } from 'src/quize/quiz.module';
import { VerifAlgorithmController } from './verif-algorithm.controller';
import { VerifAlgorithmService } from './verif-algorithm.service';

@Module({
  controllers: [VerifAlgorithmController],
  providers: [VerifAlgorithmService],
  imports: [
    SequelizeModule.forFeature([quizUserTable, answerInfo, quiz, quest]),
    QuestModule,
    QuizeModule,
  ],
})
export class VerifAlgorithmModule {}
