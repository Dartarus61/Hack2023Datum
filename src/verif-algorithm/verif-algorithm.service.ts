import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { answerInfo } from 'src/models/answerInfo.model';
import { geoPoint } from 'src/models/geoPoint.model';
import { quest } from 'src/models/quest.model';
import { quiz } from 'src/models/quiz.model';
import { quizUserTable } from 'src/models/userToQuiz.model';
import { QuestService } from 'src/quest/quest.service';
import { QuizeService } from 'src/quize/quiz.service';
import { VerifyQuestionDto } from './dto/verifyQuest.dto';

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
      attributes: { exclude: ['correctAnswer'] },
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

  async verifyQuest(dto: VerifyQuestionDto) {
    const question = await this.questRepository.findOne({
      where: { currentKey: dto.currentKey },
    });

    if (!question) {
      throw new HttpException('Question not found', HttpStatus.BAD_REQUEST);
    }

    if (JSON.stringify(question.correctAnswer) === JSON.stringify(dto.answer)) {
      return { verdict: 'Вы ответили правильно', nextKey: question.nextKey };
    } else {
      return {
        verdict: 'Вы ответили неверно',
        correctAnswer: question.correctAnswer,
        nextKey: question.nextKey,
      };
    }
  }

  async nextQuestion(currentKey: string) {
    const question = await this.questRepository.findOne({
      attributes: { exclude: ['correctAnswer'] },
      where: {
        currentKey,
      },
      include: [geoPoint],
    });

    if (!question) {
      throw new HttpException('Question not found', HttpStatus.BAD_REQUEST);
    }

    return question;
  }
}
