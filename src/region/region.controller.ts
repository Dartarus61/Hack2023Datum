import { Controller, Get, Post, Param } from '@nestjs/common';
import { RegionService } from './region.service';

@Controller('region')
export class RegionController {
  constructor(private regionService: RegionService) {}

  @Get('/all')
  getAll() {
    return this.regionService.getAll();
  }

  @Post('/create/:title')
  createRegion(@Param('title') title: string) {
    return this.regionService.create(title);
  }
}
