import { Module } from '@nestjs/common';
import { CollectionModule } from 'src/collection/collection.module';
import { ArticleModule } from 'src/article/article.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [CollectionModule, ArticleModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
