export class OperationException {
  constructor(protected readonly name: string, protected readonly data: Record<any, any> = {}) {}
}
