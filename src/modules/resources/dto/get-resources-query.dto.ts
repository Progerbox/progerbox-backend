import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { utils } from '../../../shared/utils';

export class GetResourcesQueryDto {
  // TODO: custom decorator for such transforms
  @Transform(({ value }) => utils.toArray<string>(value).map((v) => +v))
  @IsArray()
  @IsOptional()
  @IsNumber({ allowNaN: false }, { each: true })
  categories?: number[];

  @Transform(({ value }) => utils.toArray<string>(value).map((v) => +v))
  @IsArray()
  @IsOptional()
  @IsNumber({ allowNaN: false }, { each: true })
  tags?: number[];
}
