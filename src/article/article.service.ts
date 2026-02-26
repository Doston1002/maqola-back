import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { Article, ArticleDocument } from './article.model';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

function slugify(text: string, suffix?: string): string {
  const base = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
  return suffix ? `${base}-${suffix}` : base;
}

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async create(dto: CreateArticleDto) {
    const titleForSlug = dto.title_uz || dto.title_ru || dto.title_en || dto.title;
    const slug = slugify(titleForSlug, Date.now().toString(36));
    return this.articleModel.create({ ...dto, slug, keywords: dto.keywords || [] });
  }

  async findAll(publicOnly = false, collectionId?: string) {
    const q: { isPublished?: boolean; collectionId?: string } = {};
    if (publicOnly) q.isPublished = true;
    if (collectionId) q.collectionId = collectionId;
    return this.articleModel
      .find(q)
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  async search(params: {
    query?: string;
    year?: number;
    collectionId?: string;
    publicOnly?: boolean;
  }) {
    const { query, year, collectionId, publicOnly = true } = params;
    const q: Record<string, unknown> = {};
    if (publicOnly) q.isPublished = true;
    if (collectionId) q.collectionId = collectionId;

    if (query && query.trim()) {
      q.$or = [
        { title: new RegExp(query.trim(), 'i') },
        { authors: new RegExp(query.trim(), 'i') },
        { keywords: new RegExp(query.trim(), 'i') },
      ];
    }

    const pipeline: PipelineStage[] = [{ $match: q }];
    if (year) {
      pipeline.push({
        $lookup: {
          from: 'collections',
          localField: 'collectionId',
          foreignField: '_id',
          as: 'coll',
        },
      });
      pipeline.push({ $unwind: '$coll' });
      pipeline.push({ $match: { 'coll.year': year } });
    }
    pipeline.push({ $sort: { createdAt: -1 } });

    return this.articleModel.aggregate(pipeline).exec();
  }

  async findBySlug(slug: string, publicOnly = false) {
    const q: { slug: string; isPublished?: boolean } = { slug };
    if (publicOnly) q.isPublished = true;
    const doc = await this.articleModel.findOne(q).populate('collectionId').lean().exec();
    if (!doc) throw new NotFoundException('Maqola topilmadi');
    return doc;
  }

  async incrementView(slug: string) {
    const doc = await this.articleModel
      .findOneAndUpdate(
        { slug, isPublished: true },
        { $inc: { viewCount: 1 } },
        { new: true },
      )
      .lean()
      .exec();
    return doc ? true : false;
  }

  async incrementDownload(slug: string) {
    const doc = await this.articleModel
      .findOneAndUpdate(
        { slug, isPublished: true },
        { $inc: { downloadCount: 1 } },
        { new: true },
      )
      .lean()
      .exec();
    return doc ? true : false;
  }

  async findById(id: string) {
    const doc = await this.articleModel.findById(id).populate('collectionId').lean().exec();
    if (!doc) throw new NotFoundException('Maqola topilmadi');
    return doc;
  }

  async update(id: string, dto: UpdateArticleDto) {
    const doc = await this.articleModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('collectionId')
      .lean()
      .exec();
    if (!doc) throw new NotFoundException('Maqola topilmadi');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.articleModel.findByIdAndDelete(id).exec();
    if (!doc) throw new NotFoundException('Maqola topilmadi');
    return doc;
  }

  async count(publicOnly = false, collectionId?: string) {
    const q: { isPublished?: boolean; collectionId?: string } = {};
    if (publicOnly) q.isPublished = true;
    if (collectionId) q.collectionId = collectionId;
    return this.articleModel.countDocuments(q).exec();
  }

  async findRecent(limit = 10) {
    return this.articleModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('collectionId')
      .lean()
      .exec();
  }
}
