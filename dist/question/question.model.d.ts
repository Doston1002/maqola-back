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
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from '../user/user.model';
export type QuestionDocument = HydratedDocument<Question>;
export declare class Question {
    user: User;
    title: string;
    description: string;
    answer: string;
    answeredBy: User;
    answeredAt: Date;
    status: 'pending' | 'answered' | 'closed';
    isRead: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const QuestionSchema: MongooseSchema<Question, import("mongoose").Model<Question, any, any, any, import("mongoose").Document<unknown, any, Question> & Question & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Question, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Question>> & import("mongoose").FlatRecord<Question> & {
    _id: import("mongoose").Types.ObjectId;
}>;
