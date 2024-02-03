import { IsCountry } from "@common/validations/is-country.validation";
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
} from "class-validator";

export class CreateUserRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsMobilePhone()
  mobile: string;

  @IsCountry()
  country: string;
}
