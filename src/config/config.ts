import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
dotenv.config();

@Injectable()
export class Config {
  public readonly common: {
    port: number;
  };

  constructor() {
    this.common = {
      port: +(process.env.PORT ?? 3000),
    };
  }
}
