import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from "class-validator";

@ValidatorConstraint({ async: true })
export class IsCountryConstraint implements ValidatorConstraintInterface {
  async validate(country: string, args: ValidationArguments) {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${country}?fullText=true`
      );

      return response.ok;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return "Country is not valid";
  }
}

export function IsCountry(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      async: true,
      validator: new IsCountryConstraint(),
    });
  };
}
