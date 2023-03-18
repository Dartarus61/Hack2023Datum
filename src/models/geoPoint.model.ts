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
import { regionToGeoPoint } from './regionToGeoPoint.model';

@Table({ tableName: 'GeoPoint', timestamps: false, freezeTableName: true })
export class geoPoint extends Model<geoPoint> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  title: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  lat: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  lng: number;

  @Column({ type: DataType.STRING, allowNull: true })
  photoPath: string;

  @BelongsToMany(() => region, () => regionToGeoPoint)
  regions: region[];

  @ForeignKey(() => quest)
  @Column
  questId: number;

  @BelongsTo(() => quest)
  quest: quest;
}
