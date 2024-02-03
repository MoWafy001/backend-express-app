import { Expose, Transform } from "class-transformer";

export class UserSerialization {
  @Expose({ name: "uuid" })
  id: string;

  @Expose({ name: "name" })
  name: string;

  @Expose({ name: "email" })
  email: string;

  @Expose({ name: "mobile" })
  mobile: string;

  @Expose({ name: "country" })
  country: string;

  @Expose({ name: "dateOfBirth" })
  @Transform(({ value }) => (new Date()).getFullYear() - (new Date(value)).getFullYear())
  age: number;

  @Expose({ name: "createdAt" })
  createdAt: Date;

  @Expose({ name: "updatedAt" })
  updatedAt: Date;
}
