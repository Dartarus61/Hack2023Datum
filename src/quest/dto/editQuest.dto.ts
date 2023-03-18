import { CreateGeoPointDto } from 'src/geo-point/dto/createGP.dto';

export class EditQuestDto {
  readonly description: string;
  readonly correctAnswer: JSON;
  readonly ballPerQuest: number;
  readonly geoPoints: CreateGeoPointDto[];
  readonly quizId: number;
  readonly questId: number;
  readonly type: number;
}
