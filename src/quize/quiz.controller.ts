import {
  Body,
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { EditQuizDto } from './dto/editQuiz.dto';
import { QuizeService } from './quiz.service';

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

  @Get('/get/:id')
  getQuizBId(@Param('id') id: number) {
    return this.quizService.getQuizByID(id);
  }

  @Put('/edit')
  editQuiz(@Body() dto: EditQuizDto) {
    return this.quizService.editQuiz(dto);
  }

  @Delete('/delete/:id')
  deleteQuiz(@Param('id') id: number) {
    return this.quizService.deleteQuiz(id);
  }
}
