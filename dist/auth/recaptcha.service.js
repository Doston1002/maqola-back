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
exports.RecaptchaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let RecaptchaService = class RecaptchaService {
    constructor(configService, httpService) {
        this.configService = configService;
        this.httpService = httpService;
        this.verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
        this.secretKey = this.configService.get('RECAPTCHA_SECRET_KEY');
    }
    async verifyToken(token, remoteip) {
        if (!token) {
            throw new common_1.BadRequestException('reCAPTCHA token talab qilinadi');
        }
        try {
            const params = {
                secret: this.secretKey,
                response: token,
            };
            if (remoteip) {
                params.remoteip = remoteip;
            }
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(this.verifyUrl, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }));
            const result = response.data;
            if (!result.success) {
                const errorCodes = result['error-codes'] || [];
                console.error('reCAPTCHA verification failed:', errorCodes);
                throw new common_1.BadRequestException(`reCAPTCHA tekshiruvi muvaffaqiyatsiz: ${errorCodes.join(', ')}`);
            }
            return true;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            console.error('reCAPTCHA verification error:', error);
            throw new common_1.BadRequestException('reCAPTCHA tekshiruvi amalga oshirilmadi');
        }
    }
};
RecaptchaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        axios_1.HttpService])
], RecaptchaService);
exports.RecaptchaService = RecaptchaService;
//# sourceMappingURL=recaptcha.service.js.map