import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ type: Date, default: Date.now() })
  createDate: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
