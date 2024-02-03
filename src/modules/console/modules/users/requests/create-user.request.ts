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

  @IsString()
  @IsNotEmpty()
  country: string;
}
