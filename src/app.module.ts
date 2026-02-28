import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDBConfig } from './config/mongo.config';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { AdminModule } from './admin/admin.module';
import { CollectionModule } from './collection/collection.module';
import { ArticleModule } from './article/article.module';
import { ContactModule } from './contact/contact.module';
import { TelegramModule } from './telegram/telegram.module';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDBConfig,
    }),
    AuthModule,
    FileModule,
    AdminModule,
    CollectionModule,
    ArticleModule,
    ContactModule,
    TelegramModule,
  ],
})
export class AppModule {}
