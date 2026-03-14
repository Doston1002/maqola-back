import * as compression from 'compression';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV === 'production' ? ['error', 'warn'] : undefined,
  });

  app.use(compression({ threshold: 0 }));
  app.setGlobalPrefix('api');

  // Root path / — qisqa javob
  app.use((req, res, next) => {
    if (req.method === 'GET' && (req.path === '/' || req.path === '')) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).send(JSON.stringify({ status: 'ok', message: 'API ishlayapti', api: '/api' }));
    }
    next();
  });

  // Ro'yxat so'rovlari uchun qisqa cache (tezroq yuklash)
  app.use((req, res, next) => {
    if (req.method === 'GET') {
      const path = req.path;
      if (path === '/api/articles' || path === '/api/collections') {
        res.setHeader('Cache-Control', 'public, max-age=60');
      }
    }
    next();
  });

  // Xavfsizlik headerlari
  app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader(
      'Content-Security-Policy',
      [
        "frame-ancestors 'none'",
        "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "font-src 'self' data:",
        "connect-src 'self' http://localhost:8000 http://127.0.0.1:8000 https://uydatalim.uzedu.uz https://api.uydatalim.uzedu.uz",
      ].join('; '),
    );
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // CORS: barcha originlarga ruxsat
  app.enableCors({
    origin: (origin, callback) => {
      callback(null, origin || true);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const port = parseInt(process.env.PORT || '8000', 10);
  await app.listen(port, '0.0.0.0');
}

bootstrap();
