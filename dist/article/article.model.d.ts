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
import { HydratedDocument, Schema as SchemaMS } from 'mongoose';
export type ArticleDocument = HydratedDocument<Article>;
export declare class Article {
    collectionId: string;
    title: string;
    authors: string;
    abstract: string;
    keywords: string[];
    title_uz?: string;
    title_ru?: string;
    title_en?: string;
    abstract_uz?: string;
    abstract_ru?: string;
    abstract_en?: string;
    keywords_uz?: string;
    keywords_ru?: string;
    keywords_en?: string;
    pdfUrl: string;
    doi?: string;
    slug: string;
    isPublished: boolean;
    viewCount: number;
    downloadCount: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const ArticleSchema: SchemaMS<Article, import("mongoose").Model<Article, any, any, any, import("mongoose").Document<unknown, any, Article> & Article & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Article, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Article>> & import("mongoose").FlatRecord<Article> & {
    _id: import("mongoose").Types.ObjectId;
}>;
