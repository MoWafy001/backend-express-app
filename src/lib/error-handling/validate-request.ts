import { plainToClassFromExist } from "class-transformer";
import { validate, validateSync } from "class-validator";
import { HttpError } from "./http-error";
import { formatValidationErrors } from "./format-validation-errors";
import { Request } from "express";

export const validateRequest = async <T>(
  RequestClass: new () => T,
  body: Request["body"]
): Promise<T> => {
  let createItemDto = plainToClassFromExist(new RequestClass(), body);
  let errors = await validate(createItemDto as any, { whitelist: true });

  if (errors.length > 0) {
    errors = formatValidationErrors(errors);

    throw new HttpError(422, {
      errors: errors,
    });
  }

  return createItemDto;
};
