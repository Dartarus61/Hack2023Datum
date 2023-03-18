import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { QuizeService } from './quize.service';

@Controller('quiz')
export class QuizeController {
  constructor(private quizService: QuizeService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() dto: CreateQuizDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.quizService.createQuiz(dto, file);
  }
}
