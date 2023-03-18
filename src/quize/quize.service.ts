import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { quest } from 'src/models/quest.model';
import { quiz } from 'src/models/quiz.model';
import { region } from 'src/models/region.model';
import { CreateQuizDto } from './dto/createQuiz.dto';

@Injectable()
export class QuizeService {
  constructor(
    @InjectModel(quest) private questRepository: typeof quest,
    @InjectModel(quiz) private quizRepository: typeof quiz,
    @InjectModel(region) private regionRepository: typeof region,
    private fileService: FilesService,
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
      maxBall: dto.maxBall,
      title: dto.title,
      description: dto.description,
      photoPath,
    });
    await quiz.$set('region', region);
    return quiz;
  }

  async getQuizByID(id: number) {
    const quiz = await this.quizRepository.findByPk(id);

    if (!quiz) {
      throw new HttpException('Quiz not found', HttpStatus.NOT_FOUND);
    }

    return quiz;
  }
}
