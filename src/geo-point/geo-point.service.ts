import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { FilesService } from 'src/files/files.service';
import { geoPoint } from 'src/models/geoPoint.model';
import { region } from 'src/models/region.model';
import { regionToGeoPoint } from 'src/models/regionToGeoPoint.model';
import { changeGeoPointDto } from './dto/changeGP.dto';
import { CreateGeoPointDto } from './dto/createGP.dto';

@Injectable()
export class GeoPointService {
  constructor(
    @InjectModel(geoPoint)
    private GPRepository: typeof geoPoint,
    @InjectModel(region) private regionRepository: typeof region,
    @InjectModel(regionToGeoPoint)
    private regionToGeoPointRepository: typeof regionToGeoPoint,
    private fileService: FilesService,
  ) {}

  async createGeoPoint(dto: CreateGeoPointDto, file?: Express.Multer.File) {
    console.log(dto);
    console.log(file);
    const regions = await this.regionRepository.findAll({
      where: {
        id: {
          [Op.in]: dto.regions,
        },
      },
    });
    if (regions.length != dto.regions.length) {
      throw new HttpException('some regions not found', HttpStatus.BAD_REQUEST);
    }
    if (file) {
      const photoPath = this.fileService.savePicture(file);
      const data = await this.GPRepository.create({
        lat: dto.lat,
        lng: dto.lng,

        photoPath,
      });
      await data.$add('regions', regions);
      return data;
    } else {
      const data = await this.GPRepository.create({
        lat: dto.lat,
        lng: dto.lng,
      });
      await data.$add('regions', regions);
      return data;
    }
  }

  async findAll() {
    return this.GPRepository.findAll({ include: [region] });
  }

  async findOneById(id: number) {
    const point = await this.GPRepository.findByPk(id, { include: [region] });

    if (!point) {
      throw new HttpException('GeoPoint not found', HttpStatus.BAD_REQUEST);
    }

    return point;
  }

  async findByRegionName(regionsTitles: string[]) {
    const regions = await this.regionRepository.findAll({
      where: {
        title: {
          [Op.in]: regionsTitles,
        },
      },
    });

    if (regions.length != regionsTitles.length) {
      throw new HttpException('some regions not found', HttpStatus.BAD_REQUEST);
    }

    const points = await this.GPRepository.findAll({
      include: {
        model: region,
        as: 'regions',
        where: {
          title: {
            [Op.in]: regionsTitles,
          },
        },
      },
    });

    return points;
  }

  async findByTitle(title: string) {
    const point = await this.GPRepository.findOne({
      where: {
        title,
      },
      include: [region],
    });

    if (!point) {
      throw new HttpException('GeoPoint not found', HttpStatus.BAD_REQUEST);
    }

    return point;
  }

  async editPoint(dto: changeGeoPointDto) {
    const point = await this.GPRepository.findByPk(dto.id);

    if (!point) {
      throw new HttpException('GeoPoint not found', HttpStatus.BAD_REQUEST);
    }

    if (dto.region) {
      const regions = await this.regionRepository.findAll({
        where: {
          id: {
            [Op.in]: dto.region,
          },
        },
      });

      if (regions.length != dto.region.length) {
        throw new HttpException(
          'some regions not found',
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.regionToGeoPointRepository.destroy({
        where: { geoPointId: dto.id },
      });

      await point.$add('regions', dto.region);
    }

    const data = await geoPoint.update(
      { ...dto },
      {
        where: {
          id: dto.id,
        },
      },
    );

    return this.GPRepository.findByPk(dto.id, { include: [region] });
  }

  async deletePoint(id: number) {
    const candidate = await this.GPRepository.findByPk(id);

    if (!candidate) {
      throw new HttpException('GeoPoint not found', HttpStatus.BAD_REQUEST);
    }

    await candidate.destroy();

    return id;
  }
}
