import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateQuestDto } from './dto/createQuest.dto';
import { EditQuestDto } from './dto/editQuest.dto';
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

  @Get('/:key')
  getQuestByKey(@Param('key') key: string) {
    return this.questService.getQuestById(key);
  }

  @Put('/edit')
  @UseInterceptors(FileInterceptor('file'))
  editQuest(
    @Body() dto: EditQuestDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.questService.editQuest(dto, file);
  }

  @Delete('/delete/:id')
  deleteQuest(@Param('id') id: number) {
    return this.questService.deleteQuest(id);
  }
}
