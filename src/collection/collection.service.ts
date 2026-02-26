import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collection, CollectionDocument } from './collection.model';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

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
export class CollectionService {
  constructor(
    @InjectModel(Collection.name) private collectionModel: Model<CollectionDocument>,
  ) {}

  async create(dto: CreateCollectionDto) {
    const titleForSlug = dto.title_uz || dto.title_ru || dto.title_en || dto.title;
    const slug = slugify(titleForSlug, Date.now().toString(36));
    return this.collectionModel.create({ ...dto, slug });
  }

  async findAll(publicOnly = false) {
    const q = publicOnly ? { isPublished: true } : {};
    return this.collectionModel
      .find(q)
      .sort({ year: -1, createdAt: -1 })
      .lean()
      .exec();
  }

  async findBySlug(slug: string, publicOnly = false) {
    const q: { slug: string; isPublished?: boolean } = { slug };
    if (publicOnly) q.isPublished = true;
    const doc = await this.collectionModel.findOne(q).lean().exec();
    if (!doc) throw new NotFoundException('To\'plam topilmadi');
    return doc;
  }

  async findById(id: string) {
    const doc = await this.collectionModel.findById(id).lean().exec();
    if (!doc) throw new NotFoundException('To\'plam topilmadi');
    return doc;
  }

  async update(id: string, dto: UpdateCollectionDto) {
    const doc = await this.collectionModel
      .findByIdAndUpdate(id, dto, { new: true })
      .lean()
      .exec();
    if (!doc) throw new NotFoundException('To\'plam topilmadi');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.collectionModel.findByIdAndDelete(id).exec();
    if (!doc) throw new NotFoundException('To\'plam topilmadi');
    return doc;
  }

  async count(publicOnly = false) {
    const q = publicOnly ? { isPublished: true } : {};
    return this.collectionModel.countDocuments(q).exec();
  }
}
