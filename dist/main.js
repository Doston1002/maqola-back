"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.use((req, res, next) => {
        if (req.method === 'GET' && (req.path === '/' || req.path === '')) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).send(JSON.stringify({ status: 'ok', message: 'API ishlayapti', api: '/api' }));
        }
        next();
    });
    app.use((req, res, next) => {
        res.setHeader('X-Frame-Options', 'DENY');
        const contentSecurityPolicy = [
            "frame-ancestors 'none'",
            "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self' data:",
            "connect-src 'self' http://localhost:8000 http://127.0.0.1:8000 https://uydatalim.uzedu.uz https://api.uydatalim.uzedu.uz",
        ].join('; ');
        res.setHeader('Content-Security-Policy', contentSecurityPolicy);
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        next();
    });
    const allowedOriginsStr = process.env.FRONTEND_ORIGIN || '';
    const extraOrigins = allowedOriginsStr ? allowedOriginsStr.trim().split(/\s+/).filter(Boolean) : [];
    const allowedOrigins = [
        'https://uydatalim.uzedu.uz',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://teaching-science.org',
        'https://teaching-science.org',
        'http://www.teaching-science.org',
        'https://www.teaching-science.org',
        ...extraOrigins,
    ];
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    await app.listen(parseInt(process.env.PORT) || 8000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map