import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateQuestDto } from './dto/createQuest.dto';
import { QuestService } from './quest.service';

@Controller('quest')
export class QuestController {
  constructor(private questService: QuestService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() dto: CreateQuestDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.questService.createQuest(dto, file);
  }
}
