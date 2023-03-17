import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { group } from './group.schema';

export type geoPointDocument = HydratedDocument<geoPoint>;

@Schema()
export class geoPoint {
  @Prop()
  title: string;

  @Prop()
  coordinations: [number];

  @Prop()
  photoPath: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'group' }] })
  owner: group[];
}

export const geoPointSchema = SchemaFactory.createForClass(geoPoint);
