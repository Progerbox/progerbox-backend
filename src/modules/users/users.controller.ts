import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUsecase } from './usecases/create-user.usecase';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUserByIdUsecase } from './usecases/get-user-by-id.usecase';
import { GetUsersUsecase } from './usecases/get-users.usecase';
import { UsecasesResolver } from '../../libs/usecases-resolver';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usecasesResolver: UsecasesResolver) {}

  @ApiOperation({ summary: 'Admin only. Create user' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createUser(@Body() fields: CreateUserDto): Promise<any> {
    const usecase = this.usecasesResolver.get<CreateUserUsecase>(CreateUserUsecase);
    const user = await usecase.execute(fields);
    return { user };
  }

  @ApiOperation({ summary: 'Admin only. Get users' })
  @Get()
  public async getUsers(): Promise<any> {
    const usecase = this.usecasesResolver.get<GetUsersUsecase>(GetUsersUsecase);
    const users = await usecase.execute();
    return { users };
  }

  @ApiOperation({ summary: 'Admin only. Get user by id' })
  @Get('/:id')
  public async getUserById(@Param('id') id: number): Promise<any> {
    const usecase = this.usecasesResolver.get<GetUserByIdUsecase>(GetUserByIdUsecase);
    const user = await usecase.execute(id);
    return { user };
  }
}
