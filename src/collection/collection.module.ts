import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ArticleModule } from 'src/article/article.module';
import { Collection, CollectionSchema } from './collection.model';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Collection.name, schema: CollectionSchema }]),
    AuthModule,
    ArticleModule,
  ],
  controllers: [CollectionController],
  providers: [CollectionService],
  exports: [CollectionService],
})
export class CollectionModule {}
