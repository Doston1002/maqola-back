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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivityInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const user_activity_logger_1 = require("./user-activity.logger");
let UserActivityInterceptor = class UserActivityInterceptor {
    constructor(logger) {
        this.logger = logger;
    }
    intercept(context, next) {
        var _a;
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const startTime = Date.now();
        const method = request.method;
        const url = request.originalUrl || request.url;
        const ip = this.getClientIp(request);
        const userAgent = request.headers['user-agent'] || '-';
        const referer = request.headers['referer'] || '-';
        const user = request.user;
        const email = (user === null || user === void 0 ? void 0 : user.email) || (((_a = request.body) === null || _a === void 0 ? void 0 : _a.email) || '-');
        const userId = (user === null || user === void 0 ? void 0 : user._id) || (user === null || user === void 0 ? void 0 : user.id) || '-';
        const fullName = (user === null || user === void 0 ? void 0 : user.fullName) || '-';
        const role = (user === null || user === void 0 ? void 0 : user.role) || '-';
        const action = this.getActionFromRequest(method, url);
        const message = this.buildMessage(action, {
            method,
            url,
            body: request.body || {},
            params: request.params || {},
            fullName,
            email,
        });
        return next.handle().pipe((0, operators_1.tap)((data) => {
            const statusCode = response.statusCode || 200;
            let responseSize = 0;
            try {
                responseSize = data ? JSON.stringify(data).length : 0;
            }
            catch (e) {
                responseSize = 0;
            }
            this.logger.logUserActivity({
                ip,
                email,
                userId: (userId === null || userId === void 0 ? void 0 : userId.toString()) || '-',
                method,
                url,
                userAgent,
                referer,
                statusCode,
                responseSize,
                action,
                fullName,
                role,
                message,
            });
        }), (0, operators_1.catchError)((error) => {
            const statusCode = error.status || error.statusCode || 500;
            this.logger.logUserActivity({
                ip,
                email,
                userId: (userId === null || userId === void 0 ? void 0 : userId.toString()) || '-',
                method,
                url,
                userAgent,
                referer,
                statusCode,
                responseSize: 0,
                action,
                fullName,
                role,
                message,
                error: error.message || 'Unknown error',
            });
            throw error;
        }));
    }
    getClientIp(request) {
        var _a, _b;
        return (((_b = (_a = request.headers['x-forwarded-for']) === null || _a === void 0 ? void 0 : _a.split(',')[0]) === null || _b === void 0 ? void 0 : _b.trim()) ||
            request.headers['x-real-ip'] ||
            request.ip ||
            request.socket.remoteAddress ||
            '-');
    }
    getActionFromRequest(method, url) {
        const urlParts = url.split('/').filter(Boolean);
        if (url.includes('/auth/register'))
            return 'REGISTER';
        if (url.includes('/auth/login'))
            return 'LOGIN';
        if (url.includes('/auth/logout'))
            return 'LOGOUT';
        if (url.includes('/auth/oneid'))
            return 'ONEID_AUTH';
        if (url.includes('/user/update') || url.includes('/user/edit'))
            return 'UPDATE_PROFILE';
        if (url.includes('/user/edit-password'))
            return 'CHANGE_PASSWORD';
        if (url.includes('/course/create'))
            return 'CREATE_COURSE';
        if (url.includes('/course/update') || url.includes('/course/edit'))
            return 'UPDATE_COURSE';
        if (url.includes('/course/delete'))
            return 'DELETE_COURSE';
        if (url.includes('/lesson/create'))
            return 'CREATE_LESSON';
        if (url.includes('/lesson/edit') || url.includes('/lesson/update'))
            return 'UPDATE_LESSON';
        if (url.includes('/lesson/delete'))
            return 'DELETE_LESSON';
        if (url.includes('/lesson/complete'))
            return 'COMPLETE_LESSON';
        if (url.includes('/books/create'))
            return 'CREATE_BOOK';
        if (url.includes('/books/update'))
            return 'UPDATE_BOOK';
        if (url.includes('/books/delete'))
            return 'DELETE_BOOK';
        if (url.includes('/books/find-all'))
            return 'VIEW_BOOKS';
        if (url.includes('/admin/create-user'))
            return 'ADMIN_CREATE_USER';
        if (url.includes('/admin/update-user'))
            return 'ADMIN_UPDATE_USER';
        if (url.includes('/admin/block-user'))
            return 'ADMIN_BLOCK_USER';
        if (url.includes('/admin/delete-user'))
            return 'ADMIN_DELETE_USER';
        if (url.includes('/section'))
            return 'SECTION_ACTION';
        if (url.includes('/review'))
            return 'REVIEW_ACTION';
        if (url.includes('/newsletter'))
            return 'NEWSLETTER_ACTION';
        if (url.includes('/contact'))
            return 'CONTACT_ACTION';
        if (url.includes('/question'))
            return 'QUESTION_ACTION';
        if (method === 'POST')
            return 'CREATE';
        if (method === 'PUT' || method === 'PATCH')
            return 'UPDATE';
        if (method === 'DELETE')
            return 'DELETE';
        if (method === 'GET')
            return 'VIEW';
        return 'UNKNOWN';
    }
    buildMessage(action, ctx) {
        var _a, _b, _c, _d, _e, _f;
        const name = ctx.fullName && ctx.fullName !== '-' ? ctx.fullName : ctx.email || 'foydalanuvchi';
        const id = ((_a = ctx.params) === null || _a === void 0 ? void 0 : _a.id) || ((_b = ctx.body) === null || _b === void 0 ? void 0 : _b.id) || ((_c = ctx.body) === null || _c === void 0 ? void 0 : _c._id) || '-';
        const title = ((_d = ctx.body) === null || _d === void 0 ? void 0 : _d.title) || ((_e = ctx.body) === null || _e === void 0 ? void 0 : _e.name) || ((_f = ctx.body) === null || _f === void 0 ? void 0 : _f.courseTitle) || '-';
        switch (action) {
            case 'UPDATE_PROFILE':
                return `${name} profil ma'lumotlarini yangiladi`;
            case 'CHANGE_PASSWORD':
                return `${name} parolini yangiladi`;
            case 'CREATE_COURSE':
                return `${name} yangi kurs yaratdi: "${title}"`;
            case 'UPDATE_COURSE':
                return `${name} kursni yangiladi (id=${id}, title="${title}")`;
            case 'DELETE_COURSE':
                return `${name} kursni o'chirdi (id=${id})`;
            case 'CREATE_LESSON':
                return `${name} dars yaratdi: "${title}"`;
            case 'UPDATE_LESSON':
                return `${name} darsni yangiladi (id=${id}, title="${title}")`;
            case 'DELETE_LESSON':
                return `${name} darsni o'chirdi (id=${id})`;
            case 'COMPLETE_LESSON':
                return `${name} darsni yakunladi (id=${id})`;
            case 'CREATE_BOOK':
                return `${name} yangi kitob qo'shdi: "${title}"`;
            case 'UPDATE_BOOK':
                return `${name} kitobni yangiladi (id=${id}, title="${title}")`;
            case 'DELETE_BOOK':
                return `${name} kitobni o'chirdi (id=${id})`;
            case 'ADMIN_CREATE_USER':
                return `${name} (ADMIN) yangi foydalanuvchi yaratdi`;
            case 'ADMIN_UPDATE_USER':
                return `${name} (ADMIN) foydalanuvchini yangiladi (id=${id})`;
            case 'ADMIN_BLOCK_USER':
                return `${name} (ADMIN) foydalanuvchini blokladi (id=${id})`;
            case 'ADMIN_DELETE_USER':
                return `${name} (ADMIN) foydalanuvchini o'chirdi (id=${id})`;
            case 'ONEID_AUTH':
                return `${name} OneID orqali tizimga kirdi/ro'yxatdan o'tdi`;
            case 'LOGIN':
                return `${name} tizimga kirdi`;
            case 'REGISTER':
                return `${name} ro'yxatdan o'tdi`;
            case 'LOGOUT':
                return `${name} tizimdan chiqdi`;
            case 'VIEW':
                return `${name} sahifa/ma'lumotlarni koʻrmoqda`;
            default:
                return `${name} harakat: ${action}`;
        }
    }
};
UserActivityInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_activity_logger_1.UserActivityLogger])
], UserActivityInterceptor);
exports.UserActivityInterceptor = UserActivityInterceptor;
//# sourceMappingURL=user-activity.interceptor.js.map