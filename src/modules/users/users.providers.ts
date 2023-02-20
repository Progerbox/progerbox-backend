import { CreateUserUsecase } from './usecases/create-user.usecase';
import { GetUserByIdUsecase } from './usecases/get-user-by-id.usecase';
import { GetUsersUsecase } from './usecases/get-users.usecase';

export const usersProviders = [CreateUserUsecase, GetUserByIdUsecase, GetUsersUsecase];
