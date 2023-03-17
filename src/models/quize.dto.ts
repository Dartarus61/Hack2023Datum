export class quizeDto {
  readonly title: string;
  readonly description: string;
  type: number;
  variants: [string];
  answer: string | [number];
  photoPath: string;
  ballPerQuest: number;
}
