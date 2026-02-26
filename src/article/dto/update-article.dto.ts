import { IsArray, IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateArticleDto {
  @IsOptional()
  @IsString()
  collectionId?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

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

  @IsOptional()
  @IsString()
  pdfUrl?: string;

  @IsOptional()
  @IsString()
  doi?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
