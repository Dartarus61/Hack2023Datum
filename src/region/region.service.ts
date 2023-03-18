import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { retry } from 'rxjs';
import { region } from 'src/models/region.model';

@Injectable()
export class RegionService {
  constructor(@InjectModel(region) private regionRepository: typeof region) {}

  async getAll() {
    return this.regionRepository.findAll();
  }

  async create(title: string) {
    const candidate = await this.regionRepository.findOne({ where: { title } });

    if (candidate) {
      throw new HttpException('Region is exist', HttpStatus.BAD_REQUEST);
    }

    return this.regionRepository.create({ title });
  }
}
