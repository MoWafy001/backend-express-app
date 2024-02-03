import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
} from "class-validator";
import { Role } from "@common/enums/role.enum";

export class CreateAdminRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsIn([Role.ADMIN])
  role: Role;
}
