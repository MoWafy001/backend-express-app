import { plainToClassFromExist } from "class-transformer";
import { validateSync } from "class-validator";
import { HttpError } from "./http-error";
import { formatValidationErrors } from "./format-validation-errors";
import { Request } from "express";

export const validateRequest = <T>(
  RequestClass: new () => T,
  body: Request["body"]
): T => {
  let createItemDto = plainToClassFromExist(new RequestClass(), body);
  let errors = validateSync(createItemDto as any, { whitelist: true });

  if (errors.length > 0) {
    errors = formatValidationErrors(errors);

    throw new HttpError(400, {
      errors: errors,
    });
  }

  return createItemDto;
};
