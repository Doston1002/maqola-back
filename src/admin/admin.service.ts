import { Injectable } from '@nestjs/common';
import { ArticleService } from 'src/article/article.service';
import { CollectionService } from 'src/collection/collection.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly collectionService: CollectionService,
    private readonly articleService: ArticleService,
  ) {}

  async getDashboard() {
    const [collectionsCount, articlesCount, recentArticles] = await Promise.all([
      this.collectionService.count(false),
      this.articleService.count(false),
      this.articleService.findRecent(10),
    ]);
    return {
      collectionsCount,
      articlesCount,
      recentArticles,
    };
  }
}
