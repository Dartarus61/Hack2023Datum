import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { changeGeoPointDto } from './dto/changeGP.dto';
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
  getPointAll() {
    return this.gPService.findAll();
  }

  @Get('/:id')
  getPointById(@Param('id') id: number) {
    return this.gPService.findOneById(id);
  }

  //TODO: переделать тип запроса
  @Post('/reg')
  getPointByRegionsName(@Body('regions') regions: string[]) {
    return this.gPService.findByRegionName(regions);
  }

  @Get('/:title')
  getPointByTitle(@Param('title') title: string) {
    return this.gPService.findByTitle(title);
  }

  @Put('/edit')
  editPoint(@Body() dto: changeGeoPointDto) {
    return this.gPService.editPoint(dto);
  }

  @Delete('/delete/:id')
  deletePoint(@Param('id') id: number) {
    return this.gPService.deletePoint(id);
  }
}
