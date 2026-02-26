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
import { HydratedDocument } from 'mongoose';
export type CollectionDocument = HydratedDocument<Collection>;
export declare class Collection {
    title: string;
    description: string;
    title_uz?: string;
    title_ru?: string;
    title_en?: string;
    description_uz?: string;
    description_ru?: string;
    description_en?: string;
    year: number;
    coverImage?: string;
    slug: string;
    isPublished: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const CollectionSchema: import("mongoose").Schema<Collection, import("mongoose").Model<Collection, any, any, any, import("mongoose").Document<unknown, any, Collection> & Collection & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Collection, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Collection>> & import("mongoose").FlatRecord<Collection> & {
    _id: import("mongoose").Types.ObjectId;
}>;
