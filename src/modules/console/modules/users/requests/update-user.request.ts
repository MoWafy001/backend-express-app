import { IsCountry } from "@common/validations/is-country.validation";
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateUserRequest {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password?: string;

  @IsOptional()
  @IsMobilePhone()
  mobile: string;

  @IsOptional()
  @IsCountry()
  country: string;
}
