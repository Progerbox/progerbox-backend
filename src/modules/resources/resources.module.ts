import { Module } from '@nestjs/common';
import { ResourcesController } from './resources.controller';
import { UsecasesResolver } from '../../libs/usecases-resolver';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [DiscoveryModule],
  providers: [UsecasesResolver],
  controllers: [ResourcesController],
})
export class ResourcesModule {}
