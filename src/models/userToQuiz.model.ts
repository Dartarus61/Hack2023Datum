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
import { answerInfo } from './answerInfo.model';
import { quiz } from './quiz.model';

@Table({ tableName: 'QuizUserTable', timestamps: true, freezeTableName: true })
export class quizUserTable extends Model<quizUserTable> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  finalMark: number;

  @ForeignKey(() => quiz)
  @Column
  quizId: number;

  @BelongsTo(() => quiz)
  quiz: quiz;

  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @HasMany(() => answerInfo)
  answerInfos: answerInfo[];
}
