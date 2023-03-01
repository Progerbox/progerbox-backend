import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateResourceDto {
  @IsOptional()
  @IsString()
  url?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  tagsIds?: number[];
}
