import { Expose } from "class-transformer";

export class AdminSerialization {
  @Expose({ name: "uuid" })
  id: string;

  @Expose({ name: "name" })
  name: string;

  @Expose({ name: "email" })
  email: string;

  @Expose({ name: "role" })
  role: string;

  @Expose({ name: "createdAt" })
  createdAt: Date;

  @Expose({ name: "updatedAt" })
  updatedAt: Date;
}
