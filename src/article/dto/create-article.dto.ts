import { IsArray, IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  collectionId: string;

  @IsString()
  @MinLength(1, { message: 'Sarlavha bo\'sh bo\'lmasligi kerak' })
  title: string;

  @IsOptional()
  @IsString()
  authors?: string;

  @IsOptional()
  @IsString()
  abstract?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];

  @IsOptional()
  @IsString()
  title_uz?: string;

  @IsOptional()
  @IsString()
  title_ru?: string;

  @IsOptional()
  @IsString()
  title_en?: string;

  @IsOptional()
  @IsString()
  abstract_uz?: string;

  @IsOptional()
  @IsString()
  abstract_ru?: string;

  @IsOptional()
  @IsString()
  abstract_en?: string;

  @IsOptional()
  @IsString()
  keywords_uz?: string;

  @IsOptional()
  @IsString()
  keywords_ru?: string;

  @IsOptional()
  @IsString()
  keywords_en?: string;

  @IsString()
  @MinLength(1, { message: 'PDF URL bo\'sh bo\'lmasligi kerak' })
  pdfUrl: string;

  @IsOptional()
  @IsString()
  doi?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
