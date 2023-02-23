import { IUsecase } from '../../../shared/usecase/usecase.interface';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usecase } from '../../../libs/usecases-resolver';

@Usecase()
export class CreateUserUsecase implements IUsecase {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({
      ...createUserDto,
    });
    await this.usersRepository.save(user);
    return user;
  }
}
