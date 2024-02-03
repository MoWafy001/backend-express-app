import { IJwtLoginPayload } from "@common/interfaces/jwt-login-payload.interface";
import { LoginRequest } from "../requests/login.request";
import { sign } from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import { HttpError } from "@lib/error-handling/http-error";
import { validateHash } from "@lib/password/passwords";
import { config } from "@configs/config";
import { prisma } from "database/prisma";

export class LoginService {
  async login(loginRequest: LoginRequest) {
    const { email, password } = loginRequest;

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin || !(await validateHash(password, admin.password)))
      throw new HttpError(400, "Invalid Credentials");

    return {
      admin,
      token: this.signJWT(admin),
    };
  }

  signJWT(admin: Prisma.AdminGetPayload<{}>): string {
    const payload: IJwtLoginPayload = {
      id: admin.uuid,
      email: admin.email,
      name: admin.name,
      type: "user",
    };

    return sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
  }
}
