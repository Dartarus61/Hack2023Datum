import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { group } from './group.schema';

export type quizeDocument = HydratedDocument<quize>;

@Schema()
export class quize {
  @Prop()
  title: string;

  @Prop()
  photoPath: string;

  @Prop()
  maxBall: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'group' })
  region: group;
}

export const quizeSchema = SchemaFactory.createForClass(quize);
