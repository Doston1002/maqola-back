import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserActivityLogger } from './user-activity.logger';
export declare class UserActivityInterceptor implements NestInterceptor {
    private readonly logger;
    constructor(logger: UserActivityLogger);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private getClientIp;
    private getActionFromRequest;
    private buildMessage;
}
