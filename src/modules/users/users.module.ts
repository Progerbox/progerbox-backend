import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DiscoveryModule } from '@nestjs/core';
import { CreateUserUsecase } from './usecases/create-user.usecase';
import { GetUserByIdUsecase } from './usecases/get-user-by-id.usecase';
import { GetUsersUsecase } from './usecases/get-users.usecase';
import { UsecasesResolver } from '../../libs/usecases-resolver';

@Module({
  imports: [DiscoveryModule, TypeOrmModule.forFeature([User])],
  providers: [CreateUserUsecase, GetUserByIdUsecase, GetUsersUsecase, UsecasesResolver],
  controllers: [UsersController],
})
export class UsersModule {}
