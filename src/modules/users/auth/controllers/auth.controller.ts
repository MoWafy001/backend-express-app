import type { Request, Response } from "express";
import { asyncHandler } from "@helpers/async-handler";
import { BaseController } from "@lib/controllers/controller.base";
import { ControllerPrefix } from "@lib/decorators/prefix.decorator";
import { validateRequest } from "@lib/error-handling/validate-request";
import { JsonResponse } from "@lib/responses/json-response";
import { serialize } from "@helpers/serialize";

import { LoginRequest } from "../requests/login.request";
import { AuthService } from "../services/auth.service";
import { UserSerialization } from "@common/serializers/user.serialization";
import { RegisterRequest } from "../requests/register.request";

@ControllerPrefix("/users/auth")
export class AuthController extends BaseController {
  private auth: AuthService = new AuthService();

  public setRoutes(): void {
    this.router.post("/login", asyncHandler(this.login));
    this.router.post("/register", asyncHandler(this.register));
  }

  login = async (req: Request, res: Response) => {
    const loginRequest = await validateRequest(LoginRequest, req.body);
    const data = await this.auth.login(loginRequest);
    const response = new JsonResponse({
      data: serialize(data.user, UserSerialization),
    });

    res.cookie("token", data.token, {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.json(response);
  };

  register = async (req: Request, res: Response) => {
    const registerRequest = await validateRequest(RegisterRequest, req.body);
    const data = await this.auth.register(registerRequest);
    const response = new JsonResponse({
      data: serialize(data.user, UserSerialization),
    });

    res.cookie("token", data.token, {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.json(response);
  };
}
