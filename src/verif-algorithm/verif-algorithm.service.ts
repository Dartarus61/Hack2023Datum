import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { answerInfo } from 'src/models/answerInfo.model';
import { geoPoint } from 'src/models/geoPoint.model';
import { quest } from 'src/models/quest.model';
import { quiz } from 'src/models/quiz.model';
import { quizUserTable } from 'src/models/userToQuiz.model';
import { QuestService } from 'src/quest/quest.service';
import { QuizeService } from 'src/quize/quiz.service';

@Injectable()
export class VerifAlgorithmService {
  constructor(
    @InjectModel(answerInfo) private anwserRepository: typeof answerInfo,
    @InjectModel(quizUserTable)
    private userQuizRepository: typeof quizUserTable,
    @InjectModel(quiz) private quizRepository: typeof quiz,
    @InjectModel(quest) private questRepository: typeof quest,
    private questService: QuestService,
    private quizService: QuizeService,
  ) {}

  async openQuiz(id: number) {
    const openQuiz = await this.quizRepository.findByPk(id);

    if (!quiz) {
      throw new HttpException('Quiz not found', HttpStatus.BAD_REQUEST);
    }

    const firstQuestion = await this.questRepository.findOne({
      where: {
        positionInQuiz: 0,
      },
      include: [
        {
          model: quiz,
          as: 'quiz',
          where: {
            id: openQuiz.id,
          },
        },
        geoPoint,
      ],
    });
    return { openQuiz, firstQuestion };
  }

  async verifyQuest() {}
}
