import { CreateGeoPointDto } from 'src/geo-point/dto/createGP.dto';

export class CreateQuestDto {
  readonly previousKey?: string;
  readonly description: string;
  readonly correctAnswer: JSON;
  readonly ballPerQuest: number;
  readonly geoPoints: CreateGeoPointDto[];
  readonly quizId: number;
  readonly type: number;
}
