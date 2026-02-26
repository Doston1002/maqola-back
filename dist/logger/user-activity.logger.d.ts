export declare class UserActivityLogger {
    private readonly logDir;
    private readonly logFile;
    constructor();
    logUserActivity(data: {
        ip?: string;
        email?: string;
        userId?: string;
        method?: string;
        url?: string;
        userAgent?: string;
        referer?: string;
        statusCode?: number;
        responseSize?: number;
        action?: string;
        fullName?: string;
        role?: string;
        message?: string;
        error?: string;
    }): void;
    logUserActivitySimple(data: {
        ip?: string;
        email: string;
        action: 'REGISTER' | 'LOGIN' | 'LOGOUT' | string;
        status: 'SUCCESS' | 'FAILED';
        userId?: string;
        error?: string;
        userAgent?: string;
        url?: string;
        method?: string;
        fullName?: string;
        role?: string;
    }): void;
    private formatDate;
}
