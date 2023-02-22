import { ValidationError } from '@nestjs/common';
import { PropertyErrors, ValidationException } from '../exception-types/validation-exception';

export const formatValidationException = (errors: ValidationError[]) => {
  const properties = errors.map((error) => ({
    property: error.property,
    constrains: Object.keys(error.constraints || {}),
  })) as PropertyErrors[];

  return new ValidationException(properties);
};
