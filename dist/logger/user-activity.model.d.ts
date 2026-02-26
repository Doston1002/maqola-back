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
export type UserActivityDocument = HydratedDocument<UserActivity>;
export declare class UserActivity {
    user: User;
    userId: string;
    userEmail: string;
    userName: string;
    action: string;
    entity: string;
    entityId: string;
    method: string;
    url: string;
    ipAddress: string;
    userAgent: string;
    requestBody: any;
    responseData: any;
    statusCode: number;
    errorMessage: string;
    timestamp: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const UserActivitySchema: MongooseSchema<UserActivity, import("mongoose").Model<UserActivity, any, any, any, import("mongoose").Document<unknown, any, UserActivity> & UserActivity & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserActivity, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserActivity>> & import("mongoose").FlatRecord<UserActivity> & {
    _id: import("mongoose").Types.ObjectId;
}>;
