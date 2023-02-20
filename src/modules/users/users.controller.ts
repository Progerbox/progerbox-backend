import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './responses/user.response';
import { UsersResponse } from './responses/users.response';
import { CreateUserUsecase } from './usecases/create-user.usecase';
import { ApiTags } from '@nestjs/swagger';
import { GetUserByIdUsecase } from './usecases/get-user-by-id.usecase';
import { GetUsersUsecase } from './usecases/get-users.usecase';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly getUserByIdUsecase: GetUserByIdUsecase,
    private readonly getUsersUsecase: GetUsersUsecase,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    const user = await this.createUserUsecase.execute(createUserDto);
    return { user };
  }

  @Get()
  public async getUsers(): Promise<UsersResponse> {
    const users = await this.getUsersUsecase.execute();
    return { users };
  }

  @Get('/:id')
  public async getUserById(@Param('id') id: number): Promise<UserResponse> {
    const user = await this.getUserByIdUsecase.execute(id);
    return { user };
  }
}
