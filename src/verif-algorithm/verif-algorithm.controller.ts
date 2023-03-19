import { Controller, Post, Get, Param } from '@nestjs/common';
import { VerifAlgorithmService } from './verif-algorithm.service';

@Controller('verif')
export class VerifAlgorithmController {
  constructor(private verifAlgService: VerifAlgorithmService) {}

  @Get('/openQuiz/:id')
  openQuiz(@Param('id') id: number) {
    return this.verifAlgService.openQuiz(id);
  }
}
