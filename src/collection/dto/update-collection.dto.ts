import { IsBoolean, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCollectionDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

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
  description_uz?: string;

  @IsOptional()
  @IsString()
  description_ru?: string;

  @IsOptional()
  @IsString()
  description_en?: string;

  @IsOptional()
  @IsNumber()
  year?: number;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
