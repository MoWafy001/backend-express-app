import { ValidationError } from "class-validator";

export const formatValidationErrors = (errors: ValidationError[]) => {
  return errors.map((error) => {
    const { property, constraints } = error;

    const out: any = {};

    if (constraints) {
      out[property] = Object.values(constraints);
    }

    return out;
  });
};
