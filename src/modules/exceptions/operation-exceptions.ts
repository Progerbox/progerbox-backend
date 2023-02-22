import { Injectable } from '@nestjs/common';
import { OperationException } from './exception-types/operation-exception';

interface UserNotFound {
  id?: number;
}

@Injectable()
export class OperationExceptions {
  public readonly users = {
    notFound: (data: UserNotFound = {}) => new OperationException('USER_NOT_FOUND', data),
  };
}
