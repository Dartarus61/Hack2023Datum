import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { geoPoint } from './geoPoint.model';
import { quiz } from './quiz.model';
import { region } from './region.model';
import { regionToGeoPoint } from './regionToGeoPoint.model';

@Table({ tableName: 'quest', timestamps: false, freezeTableName: true })
export class quest extends Model<quest> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  type: number;

  @Column({ type: DataType.STRING, allowNull: true })
  photoPath: string;

  @Column({ type: DataType.STRING, allowNull: false })
  correctAnswer: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  ballPerQuest: number;

  @HasMany(() => geoPoint)
  geoPoints: geoPoint[];

  @ForeignKey(() => quiz)
  @Column
  quizId: number;

  @BelongsTo(() => quiz)
  quiz: quiz;
}
