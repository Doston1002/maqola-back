import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @HttpCode(200)
  @Auth('ADMIN')
  create(@Body() dto: CreateArticleDto) {
    return this.articleService.create(dto);
  }

  @Get()
  @HttpCode(200)
  findAll(@Query('collectionId') collectionId?: string) {
    return this.articleService.findAll(true, collectionId);
  }

  @Get('search')
  @HttpCode(200)
  search(
    @Query('q') query?: string,
    @Query('year') year?: string,
    @Query('collectionId') collectionId?: string,
  ) {
    return this.articleService.search({
      query,
      year: year ? parseInt(year, 10) : undefined,
      collectionId,
      publicOnly: true,
    });
  }

  @Get('slug/:slug')
  @HttpCode(200)
  async findBySlug(@Param('slug') slug: string) {
    const article = await this.articleService.findBySlug(slug, true);
    await this.articleService.incrementView(slug);
    return article;
  }

  @Get('slug/:slug/download')
  @HttpCode(200)
  async recordDownload(@Param('slug') slug: string) {
    await this.articleService.incrementDownload(slug);
    return { success: true };
  }

  @Get('admin/all')
  @HttpCode(200)
  @Auth('ADMIN')
  findAllAdmin(@Query('collectionId') collectionId?: string) {
    return this.articleService.findAll(false, collectionId);
  }

  @Get('admin/:id')
  @HttpCode(200)
  @Auth('ADMIN')
  findById(@Param('id') id: string) {
    return this.articleService.findById(id);
  }

  @Patch(':id')
  @HttpCode(200)
  @Auth('ADMIN')
  update(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    return this.articleService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('ADMIN')
  remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }
}
