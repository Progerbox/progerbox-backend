export interface PropertyErrors {
  property: string;
  constrains: string[];
}

export class ValidationException {
  constructor(protected readonly errors: PropertyErrors[]) {}
}
