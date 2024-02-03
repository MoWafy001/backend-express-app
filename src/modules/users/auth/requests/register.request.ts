import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
