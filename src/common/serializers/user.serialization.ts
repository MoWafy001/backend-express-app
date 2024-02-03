import { Expose } from "class-transformer";

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

  @Expose({ name: "createdAt" })
  createdAt: Date;

  @Expose({ name: "updatedAt" })
  updatedAt: Date;
}
