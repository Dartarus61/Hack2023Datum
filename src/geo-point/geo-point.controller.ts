import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get
} from '@nestjs/common';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateGeoPointDto } from './dto/createGP.dto';
import { GeoPointService } from './geo-point.service';

@Controller('gp')
export class GeoPointController {
  constructor(private gPService: GeoPointService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() dto: CreateGeoPointDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.gPService.createGeoPoint(dto, file);
  }

  @Get('/all')
  getAll() {
    return this.gPService.findAll()
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.gPService.findOneById(id)
  }

  @Get()
  
}
