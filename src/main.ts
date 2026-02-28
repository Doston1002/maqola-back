// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.setGlobalPrefix('api');
//   app.enableCors({
//     origin: [
//       'https://uyda-talim.uz',
//       'https://uyda-talim.uz',
//     ],
//     methods: ["GET", "POST"],
//     credentials: true,
//   });
//   await app.listen(parseInt(process.env.PORT) || 8000, "0.0.0.0");
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Root path / — 404 o‘rniga qisqa javob (API /api da)
  app.use((req, res, next) => {
    if (req.method === 'GET' && (req.path === '/' || req.path === '')) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).send(JSON.stringify({ status: 'ok', message: 'API ishlayapti', api: '/api' }));
    }
    next();
  });

  // ✅ SECURITY FIX: Clickjacking + CSP
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
  
  // CORS: frontend domenlari (serverda FRONTEND_ORIGIN=http://localhost:3000 https://sitename.uz qo'shing)
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
    'https://maqola-frond-j8c9.vercel.app', // Vercel deploy
    ...extraOrigins,
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
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



// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.setGlobalPrefix('api');
  
//   // ✅ SECURITY FIX: Clickjacking + CSP
//   app.use((req, res, next) => {
//     // X-Frame-Options header - clickjacking hujumlaridan himoya qilish
//     res.setHeader('X-Frame-Options', 'DENY');
    
//     // Content Security Policy:
//     //  - frame-ancestors 'none'  -> bizning saytni boshqa saytlar iframe ichiga qo'ya olmaydi
//     //  - frame-src youtube       -> biz o'zimiz YouTube videolarini iframe orqali qo'ya olamiz
//     res.setHeader(
//       'Content-Security-Policy',
//       "frame-ancestors 'none'; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com; default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://uydatalim.uzedu.uz https://api.uydatalim.uzedu.uz;"
//     );
    
//     // X-Content-Type-Options - MIME type sniffing'ni oldini olish
//     res.setHeader('X-Content-Type-Options', 'nosniff');
    
//     // X-XSS-Protection - Eski brauzerlar uchun qo'shimcha himoya
//     res.setHeader('X-XSS-Protection', '1; mode=block');
    
//     next();
//   });
  
//   app.enableCors({
//     origin: (origin, callback) => {
//       const allowedOrigins = [
//         'https://uydatalim.uzedu.uz',
//         'http://localhost:3000'
//       ];
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//     credentials: true,
//   });

//   await app.listen(parseInt(process.env.PORT) || 8001, '0.0.0.0');
// }
// bootstrap();