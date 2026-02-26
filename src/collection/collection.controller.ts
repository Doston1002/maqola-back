import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ArticleService } from 'src/article/article.service';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Controller('collections')
export class CollectionController {
  constructor(
    private readonly collectionService: CollectionService,
    private readonly articleService: ArticleService,
  ) {}

  @Post()
  @HttpCode(200)
  @Auth('ADMIN')
  create(@Body() dto: CreateCollectionDto) {
    return this.collectionService.create(dto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.collectionService.findAll(true);
  }

  @Get('admin/all')
  @HttpCode(200)
  @Auth('ADMIN')
  findAllAdmin() {
    return this.collectionService.findAll(false);
  }

  @Get('slug/:slug')
  @HttpCode(200)
  findBySlug(@Param('slug') slug: string) {
    return this.collectionService.findBySlug(slug, true);
  }

  @Get('admin/slug/:slug')
  @HttpCode(200)
  @Auth('ADMIN')
  findBySlugAdmin(@Param('slug') slug: string) {
    return this.collectionService.findBySlug(slug, false);
  }

  @Get('admin/:id')
  @HttpCode(200)
  @Auth('ADMIN')
  findById(@Param('id') id: string) {
    return this.collectionService.findById(id);
  }

  @Patch(':id')
  @HttpCode(200)
  @Auth('ADMIN')
  update(@Param('id') id: string, @Body() dto: UpdateCollectionDto) {
    return this.collectionService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('ADMIN')
  remove(@Param('id') id: string) {
    return this.collectionService.remove(id);
  }

  @Get('stats/counts')
  @HttpCode(200)
  async getStats() {
    const [collectionsCount, articlesCount] = await Promise.all([
      this.collectionService.count(true),
      this.articleService.count(true),
    ]);
    return { collectionsCount, articlesCount };
  }
}
