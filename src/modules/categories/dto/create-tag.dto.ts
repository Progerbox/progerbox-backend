import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTagDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
