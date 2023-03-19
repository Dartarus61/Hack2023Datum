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
import { region } from './region.model';
import { quizUserTable } from './userToQuiz.model';

@Table({ tableName: 'Quiz', timestamps: false, freezeTableName: true })
export class quiz extends Model<quiz> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  maxBall: number; //! макс балл за квиз

  @Column({ type: DataType.STRING, allowNull: true })
  photoPath: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  finished: boolean;

  @ForeignKey(() => region)
  @Column
  regionId: number;

  @BelongsTo(() => region)
  region: region;

  @HasMany(() => quest)
  quests: quest[];

  @HasMany(() => quizUserTable)
  quizTables: quizUserTable[];
}
