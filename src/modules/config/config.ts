import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
dotenv.config();

@Injectable()
export class Config {
  public readonly common: {
    port: number;
  };
  public readonly database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };

  constructor() {
    this.common = {
      port: +(process.env.PORT ?? 0),
    };
    this.database = {
      host: process.env.DB_HOST ?? '',
      port: +(process.env.DB_PORT ?? 0),
      username: process.env.DB_USERNAME ?? '',
      password: process.env.DB_PASSWORD ?? '',
      database: process.env.DB_DATABASE ?? '',
    };
  }
}
