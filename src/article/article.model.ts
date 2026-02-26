import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMS } from 'mongoose';
import { Collection } from 'src/collection/collection.model';

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ timestamps: true })
export class Article {
  @Prop({ type: SchemaMS.Types.ObjectId, ref: Collection.name, required: true, index: true })
  collectionId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  authors: string;

  @Prop({ default: '' })
  abstract: string;

  @Prop({ type: [String], default: [] })
  keywords: string[];

  @Prop()
  title_uz?: string;

  @Prop()
  title_ru?: string;

  @Prop()
  title_en?: string;

  @Prop()
  abstract_uz?: string;

  @Prop()
  abstract_ru?: string;

  @Prop()
  abstract_en?: string;

  @Prop()
  keywords_uz?: string;

  @Prop()
  keywords_ru?: string;

  @Prop()
  keywords_en?: string;

  @Prop({ required: true })
  pdfUrl: string;

  @Prop()
  doi?: string;

  @Prop({ unique: true, required: true, index: true })
  slug: string;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ default: 0 })
  viewCount: number;

  @Prop({ default: 0 })
  downloadCount: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
ArticleSchema.index({ collectionId: 1, isPublished: 1 });
ArticleSchema.index({ title: 'text', authors: 'text', keywords: 'text' });
