import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { GeoPointService } from 'src/geo-point/geo-point.service';
import { geoPoint } from 'src/models/geoPoint.model';
import { quest } from 'src/models/quest.model';
import { quiz } from 'src/models/quiz.model';
import { region } from 'src/models/region.model';
import { CreateQuestDto } from './dto/createQuest.dto';
import { EditQuestDto } from './dto/editQuest.dto';

@Injectable()
export class QuestService {
  constructor(
    @InjectModel(quest) private questRepository: typeof quest,
    @InjectModel(quiz) private quizRepository: typeof quiz,
    @InjectModel(region) private regionRepository: typeof region,
    private fileService: FilesService,
    private geoPointService: GeoPointService,
  ) {}

  async createQuest(dto: CreateQuestDto, file?: Express.Multer.File) {
    const quiz = await this.quizRepository.findByPk(dto.quizId, {
      include: { all: true },
    });

    if (!quiz) {
      throw new HttpException('Quiz not found', HttpStatus.BAD_REQUEST);
    }

    const result = await this.getCountOfQuests(dto.quizId);

    let positionInQuiz: number = 0;

    if (result.count != 0) {
      positionInQuiz = result.count + 1;
    }

    let geoPointArr: geoPoint[] = [];

    Promise.all([
      dto.geoPoints.forEach(async (element) => {
        geoPointArr.push(await this.geoPointService.createGeoPoint(element));
      }),
    ]);

    let photoPath;
    if (file) {
      photoPath = this.fileService.savePicture(file);
    }

    const quest = await this.questRepository.create({
      previousKey: dto.previousKey,
      description: dto.description,
      correctAnswer: dto.correctAnswer,
      ballPerQuest: dto.ballPerQuest,
      quizId: dto.quizId,
      type: dto.type,
      positionInQuiz,
      photoPath,
    });

    if (dto.previousKey) {
      const prevQuest = await this.getQuestById(dto.previousKey);
      await this.questRepository.update(
        { nextKey: quest.currentKey },
        {
          where: {
            id: prevQuest.id,
          },
        },
      );
    }

    await quest.$add('geoPoints', geoPointArr);

    return this.questRepository.findByPk(quest.id, { include: { all: true } });
  }

  async getCountOfQuests(quizId: number) {
    const count = await this.questRepository.findAndCountAll({
      include: {
        model: quiz,
        as: 'quiz',
        where: {
          id: quizId,
        },
      },
    });

    return count;
  }

  async getQuestById(questId: string) {
    const quest = await this.questRepository.findOne({
      where: {
        currentKey: questId,
      },
      include: { all: true },
    });

    if (!quest) {
      throw new HttpException('Quest not found', HttpStatus.BAD_REQUEST);
    }

    return quest;
  }

  async editQuest(dto: EditQuestDto, file?: Express.Multer.File) {
    const quiz = await this.quizRepository.findByPk(dto.quizId, {
      include: { all: true },
    });

    if (!quiz) {
      throw new HttpException('Quiz not found', HttpStatus.BAD_REQUEST);
    }

    const result = await this.getCountOfQuests(dto.questId);

    let positionInQuiz: number = 0;

    if (result.count != 0) {
      positionInQuiz = result.count + 1;
    }

    let geoPointArr: geoPoint[] = [];

    const prevQuest = await this.questRepository.findByPk(dto.questId, {
      include: { all: true },
    });

    Promise.all([
      prevQuest.geoPoints.forEach(async (el) => {
        await el.destroy();
      }),
      dto.geoPoints.forEach(async (element) => {
        geoPointArr.push(await this.geoPointService.createGeoPoint(element));
      }),
    ]);

    let photoPath;
    if (file) {
      photoPath = this.fileService.savePicture(file);
    }

    await this.questRepository.update(
      {
        description: dto.description,
        correctAnswer: dto.correctAnswer,
        ballPerQuest: dto.ballPerQuest,
        type: dto.type,
        photoPath,
      },
      {
        where: {
          id: prevQuest.id,
        },
      },
    );

    await prevQuest.$add('geoPoints', geoPointArr);

    return this.questRepository.findByPk(prevQuest.id, {
      include: { all: true },
    });
  }

  async deleteQuest(id: number) {
    const candidate = await this.questRepository.findByPk(id, {
      include: { all: true },
    });

    if (!candidate) {
      throw new HttpException('Quest not found', HttpStatus.BAD_REQUEST);
    }

    Promise.all([
      candidate.geoPoints.forEach(async (el) => {
        await el.destroy();
      }),
    ]);

    await candidate.destroy();

    return candidate;
  }
}
