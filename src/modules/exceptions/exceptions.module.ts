import { Module, Global } from '@nestjs/common';
import { OperationExceptions } from './operation-exceptions';

@Global()
@Module({
  providers: [OperationExceptions],
  exports: [OperationExceptions],
})
export class ExceptionsModule {}
