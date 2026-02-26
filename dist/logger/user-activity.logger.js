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
exports.UserActivityLogger = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
let UserActivityLogger = class UserActivityLogger {
    constructor() {
        this.logDir = '/var/log/users-log';
        this.logFile = (0, path_1.join)(this.logDir, 'users-access.log');
        if (!(0, fs_1.existsSync)(this.logDir)) {
            try {
                (0, fs_1.mkdirSync)(this.logDir, { recursive: true, mode: 0o755 });
                console.log(`✅ Log papkasi yaratildi: ${this.logDir}`);
            }
            catch (error) {
                console.error('❌ Log papkasini yaratishda xatolik:', error);
                console.error('Iltimos, qo\'lda yarating: sudo mkdir -p /var/log/users-log && sudo chmod 755 /var/log/users-log');
            }
        }
        else {
            console.log(`✅ Log papkasi mavjud: ${this.logDir}`);
        }
    }
    logUserActivity(data) {
        try {
            const date = new Date();
            const dateStr = this.formatDate(date);
            const ip = data.ip || '-';
            const userAgent = data.userAgent || '-';
            const referer = data.referer || '-';
            const userId = data.userId || '-';
            const email = data.email || '-';
            const fullName = data.fullName || '-';
            const role = data.role || '-';
            const method = data.method || 'GET';
            const url = data.url || '/';
            const statusCode = data.statusCode || 200;
            const responseSize = data.responseSize || 0;
            const action = data.action || '-';
            const message = data.message || '-';
            const error = data.error || '-';
            const logLine = `${ip} - - [${dateStr}] "${method} ${url} HTTP/1.1" ${statusCode} ${responseSize} "${referer}" "${userAgent}" "${email}" "${userId}" "${fullName}" "${role}" "${action}" "${message}" "${error}"\n`;
            (0, fs_1.appendFileSync)(this.logFile, logLine, { encoding: 'utf8', flag: 'a' });
        }
        catch (error) {
            console.error('Log yozishda xatolik:', error);
        }
    }
    logUserActivitySimple(data) {
        try {
            const date = new Date();
            const dateStr = this.formatDate(date);
            const ip = data.ip || '-';
            const userId = data.userId || '-';
            const error = data.error || '-';
            const userAgent = data.userAgent || '-';
            const url = data.url || `/api/auth/${data.action.toLowerCase()}`;
            const method = data.method || 'POST';
            const fullName = data.fullName || '-';
            const role = data.role || '-';
            const statusCode = data.status === 'SUCCESS' ? 200 : 400;
            const logLine = `${ip} - - [${dateStr}] "${method} ${url} HTTP/1.1" ${statusCode} ${data.email.length} "-" "${userAgent}" "${data.email}" "${userId}" "${fullName}" "${role}" "${data.action}" "${error}"\n`;
            (0, fs_1.appendFileSync)(this.logFile, logLine, { encoding: 'utf8', flag: 'a' });
        }
        catch (error) {
            console.error('Log yozishda xatolik:', error);
        }
    }
    formatDate(date) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const day = String(date.getDate()).padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const offset = -date.getTimezoneOffset();
        const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
        const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, '0');
        const offsetSign = offset >= 0 ? '+' : '-';
        return `${day}/${month}/${year}:${hours}:${minutes}:${seconds} ${offsetSign}${offsetHours}${offsetMinutes}`;
    }
};
UserActivityLogger = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserActivityLogger);
exports.UserActivityLogger = UserActivityLogger;
//# sourceMappingURL=user-activity.logger.js.map