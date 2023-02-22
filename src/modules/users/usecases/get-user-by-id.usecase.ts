import { IUsecase } from '../../../shared/usecase.interface';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperationExceptions } from '../../exceptions/operation-exceptions';

export class GetUserByIdUsecase implements IUsecase {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly operationExceptions: OperationExceptions,
  ) {}

  async execute(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw this.operationExceptions.users.notFound({ id });
    }

    return user;
  }
}
