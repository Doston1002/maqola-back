/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './article.model';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
export declare class ArticleService {
    private articleModel;
    constructor(articleModel: Model<ArticleDocument>);
    create(dto: CreateArticleDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Article> & Article & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, Article> & Article & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(publicOnly?: boolean, collectionId?: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Article> & Article & {
        _id: import("mongoose").Types.ObjectId;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    search(params: {
        query?: string;
        year?: number;
        collectionId?: string;
        publicOnly?: boolean;
    }): Promise<any[]>;
    findBySlug(slug: string, publicOnly?: boolean): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Article> & Article & {
        _id: import("mongoose").Types.ObjectId;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    incrementView(slug: string): Promise<boolean>;
    incrementDownload(slug: string): Promise<boolean>;
    findById(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Article> & Article & {
        _id: import("mongoose").Types.ObjectId;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    update(id: string, dto: UpdateArticleDto): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Article> & Article & {
        _id: import("mongoose").Types.ObjectId;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Article> & Article & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, Article> & Article & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    count(publicOnly?: boolean, collectionId?: string): Promise<number>;
    findRecent(limit?: number): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Article> & Article & {
        _id: import("mongoose").Types.ObjectId;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
}
