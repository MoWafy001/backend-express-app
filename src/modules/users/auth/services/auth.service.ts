import { IJwtLoginPayload } from "@common/interfaces/jwt-login-payload.interface";
import { LoginRequest } from "../requests/login.request";
import { sign } from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import { HttpError } from "@lib/error-handling/http-error";
import { hashPassword, validateHash } from "@lib/password/passwords";
import { config } from "@configs/config";
import { RegisterRequest } from "../requests/register.request";
import { prisma } from "src/database/prisma";

export class AuthService {
  async login(loginRequest: LoginRequest) {
    const { email, password } = loginRequest;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await validateHash(password, user.password)))
      throw new HttpError(400, "Invalid Credentials");

    return {
      user,
      token: this.signJWT(user),
    };
  }

  async register(registerRequest: RegisterRequest) {
    registerRequest.password =
      registerRequest.password && hashPassword(registerRequest.password);

    const user = await prisma.user.create({
      data: registerRequest,
    });

    return {
      user,
      token: this.signJWT(user),
    };
  }

  signJWT(user: Prisma.UserGetPayload<{}>): string {
    const payload: IJwtLoginPayload = {
      id: user.uuid,
      email: user.email,
      name: user.name,
      type: "user",
    };

    return sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
  }
}
