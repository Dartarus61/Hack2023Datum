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

@Table({ tableName: 'quest', timestamps: false, freezeTableName: true })
export class quest extends Model<quest> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  previousKey: string;

  @Column({
    type: DataType.UUID,
    allowNull: true,
    defaultValue: DataType.UUIDV4,
  })
  currentKey: string;

  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  nextKey: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  positionInQuiz: number;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.INTEGER, allowNull: false }) //! тип задания (1,2,3)
  type: number;

  @Column({ type: DataType.STRING, allowNull: true })
  photoPath: string;

  @Column({ type: DataType.JSON, allowNull: false })
  correctAnswer: JSON;

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
