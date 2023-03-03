import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tagsIds?: number[];
}
