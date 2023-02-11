import { Global, Module } from '@nestjs/common';
import { Config } from './config';

@Global()
@Module({
  providers: [Config],
  exports: [Config],
})
export class ConfigModule {}
