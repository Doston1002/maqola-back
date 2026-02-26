import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CollectionDocument = HydratedDocument<Collection>;

@Schema({ timestamps: true })
export class Collection {
  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop()
  title_uz?: string;

  @Prop()
  title_ru?: string;

  @Prop()
  title_en?: string;

  @Prop()
  description_uz?: string;

  @Prop()
  description_ru?: string;

  @Prop()
  description_en?: string;

  @Prop({ required: true })
  year: number;

  @Prop()
  coverImage?: string;

  @Prop({ unique: true, required: true, index: true })
  slug: string;

  @Prop({ default: false })
  isPublished: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
CollectionSchema.index({ year: -1, isPublished: 1 });
