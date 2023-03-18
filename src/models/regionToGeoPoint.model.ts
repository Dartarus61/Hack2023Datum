import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { geoPoint } from './geoPoint.model';
import { region } from './region.model';

@Table({
  tableName: 'RegionToGeoPoint',
  timestamps: false,
  freezeTableName: true,
})
export class regionToGeoPoint extends Model<regionToGeoPoint> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => geoPoint)
  @Column
  geoPointId: number;

  @ForeignKey(() => region)
  @Column
  regionId: number;
}
