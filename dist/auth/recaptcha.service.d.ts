import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
export interface RecaptchaVerificationResponse {
    success: boolean;
    challenge_ts?: string;
    hostname?: string;
    'error-codes'?: string[];
}
export declare class RecaptchaService {
    private readonly configService;
    private readonly httpService;
    private readonly secretKey;
    private readonly verifyUrl;
    constructor(configService: ConfigService, httpService: HttpService);
    verifyToken(token: string, remoteip?: string): Promise<boolean>;
}
