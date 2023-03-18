import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { geoPoint } from './geoPoint.model';
import { quiz } from './quiz.model';
import { regionToGeoPoint } from './regionToGeoPoint.model';

@Table({ tableName: 'Region', timestamps: false, freezeTableName: true })
export class region extends Model<region> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @BelongsToMany(() => geoPoint, () => regionToGeoPoint)
  geoPoints: geoPoint[];

  @HasMany(() => quiz)
  quiz: quiz[];
}
