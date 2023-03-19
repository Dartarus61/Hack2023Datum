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
import { quest } from './quest.model';
import { quiz } from './quiz.model';
import { quizUserTable } from './userToQuiz.model';

@Table({ tableName: 'answerInfo', timestamps: true, freezeTableName: true })
export class answerInfo extends Model<answerInfo> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  mark: number;

  @ForeignKey(() => quest)
  @Column
  questId: number;

  @BelongsTo(() => quest)
  quest: quest;

  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @Column({ type: DataType.JSON, allowNull: false })
  answer: JSON;

  @Column({ type: DataType.JSON, allowNull: false })
  rightAnswer: JSON;

  @Column({ type: DataType.INTEGER, allowNull: false })
  posInQuiz: number;

  @ForeignKey(() => quizUserTable)
  @Column
  quizUserTableId: number;

  @BelongsTo(() => quizUserTable)
  quizUserTable: quizUserTable;
}
