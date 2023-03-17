import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type groupDocument = HydratedDocument<group>;

@Schema()
export class group {
  @Prop()
  title: string;
}

export const groupSchema = SchemaFactory.createForClass(group);
