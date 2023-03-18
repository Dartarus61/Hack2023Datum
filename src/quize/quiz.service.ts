import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { quest } from 'src/models/quest.model';
import { quiz } from 'src/models/quiz.model';
import { region } from 'src/models/region.model';
import { QuestService } from 'src/quest/quest.service';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { EditQuizDto } from './dto/editQuiz.dto';

@Injectable()
export class QuizeService {
  constructor(
    @InjectModel(quest) private questRepository: typeof quest,
    @InjectModel(quiz) private quizRepository: typeof quiz,
    @InjectModel(region) private regionRepository: typeof region,
    private fileService: FilesService,
    private questService: QuestService,
  ) {}

  async createQuiz(dto: CreateQuizDto, file?: Express.Multer.File) {
    const region = await this.regionRepository.findByPk(dto.regionId);

    if (!region) {
      throw new HttpException('region not found', HttpStatus.BAD_REQUEST);
    }

    let photoPath;
    if (file) {
      photoPath = this.fileService.savePicture(file);
    }

    const quiz = await this.quizRepository.create({
      title: dto.title,
      description: dto.description,
      photoPath,
    });
    await quiz.$set('region', region);
    return quiz;
  }

  async getQuizByID(id: number) {
    const quiz = await this.quizRepository.findByPk(id, {
      include: { all: true },
    });

    if (!quiz) {
      throw new HttpException('Quiz not found', HttpStatus.NOT_FOUND);
    }

    return quiz;
  }

  async editQuiz(dto: EditQuizDto, file?: Express.Multer.File) {
    const quiz = await this.getQuizByID(dto.quizId);

    if (file) {
      const photoPath = this.fileService.savePicture(file);
      await this.quizRepository.update(
        { photoPath },
        { where: { id: dto.quizId } },
      );
    }

    await this.quizRepository.update(
      { title: dto.title, description: dto.description },
      { where: { id: dto.quizId } },
    );

    return this.getQuizByID(dto.quizId);
  }

  async deleteQuiz(id: number) {
    const candidate = await this.getQuizByID(id);

    Promise.all([
      candidate.quests.forEach(async (el) => {
        await this.questService.deleteQuest(el.id);
      }),
    ]);

    await candidate.destroy();

    return candidate;
  }
}
