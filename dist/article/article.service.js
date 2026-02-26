"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const article_model_1 = require("./article.model");
function slugify(text, suffix) {
    const base = text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
    return suffix ? `${base}-${suffix}` : base;
}
let ArticleService = class ArticleService {
    constructor(articleModel) {
        this.articleModel = articleModel;
    }
    async create(dto) {
        const titleForSlug = dto.title_uz || dto.title_ru || dto.title_en || dto.title;
        const slug = slugify(titleForSlug, Date.now().toString(36));
        return this.articleModel.create(Object.assign(Object.assign({}, dto), { slug, keywords: dto.keywords || [] }));
    }
    async findAll(publicOnly = false, collectionId) {
        const q = {};
        if (publicOnly)
            q.isPublished = true;
        if (collectionId)
            q.collectionId = collectionId;
        return this.articleModel
            .find(q)
            .sort({ createdAt: -1 })
            .lean()
            .exec();
    }
    async search(params) {
        const { query, year, collectionId, publicOnly = true } = params;
        const q = {};
        if (publicOnly)
            q.isPublished = true;
        if (collectionId)
            q.collectionId = collectionId;
        if (query && query.trim()) {
            q.$or = [
                { title: new RegExp(query.trim(), 'i') },
                { authors: new RegExp(query.trim(), 'i') },
                { keywords: new RegExp(query.trim(), 'i') },
            ];
        }
        const pipeline = [{ $match: q }];
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
    async findBySlug(slug, publicOnly = false) {
        const q = { slug };
        if (publicOnly)
            q.isPublished = true;
        const doc = await this.articleModel.findOne(q).populate('collectionId').lean().exec();
        if (!doc)
            throw new common_1.NotFoundException('Maqola topilmadi');
        return doc;
    }
    async incrementView(slug) {
        const doc = await this.articleModel
            .findOneAndUpdate({ slug, isPublished: true }, { $inc: { viewCount: 1 } }, { new: true })
            .lean()
            .exec();
        return doc ? true : false;
    }
    async incrementDownload(slug) {
        const doc = await this.articleModel
            .findOneAndUpdate({ slug, isPublished: true }, { $inc: { downloadCount: 1 } }, { new: true })
            .lean()
            .exec();
        return doc ? true : false;
    }
    async findById(id) {
        const doc = await this.articleModel.findById(id).populate('collectionId').lean().exec();
        if (!doc)
            throw new common_1.NotFoundException('Maqola topilmadi');
        return doc;
    }
    async update(id, dto) {
        const doc = await this.articleModel
            .findByIdAndUpdate(id, dto, { new: true })
            .populate('collectionId')
            .lean()
            .exec();
        if (!doc)
            throw new common_1.NotFoundException('Maqola topilmadi');
        return doc;
    }
    async remove(id) {
        const doc = await this.articleModel.findByIdAndDelete(id).exec();
        if (!doc)
            throw new common_1.NotFoundException('Maqola topilmadi');
        return doc;
    }
    async count(publicOnly = false, collectionId) {
        const q = {};
        if (publicOnly)
            q.isPublished = true;
        if (collectionId)
            q.collectionId = collectionId;
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
};
ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(article_model_1.Article.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map