import type { Request, Response } from "express";
import { asyncHandler } from "@helpers/async-handler";
import { BaseController } from "@lib/controllers/controller.base";
import { ControllerPrefix } from "@lib/decorators/prefix.decorator";
import { validateRequest } from "@lib/error-handling/validate-request";
import { JsonResponse } from "@lib/responses/json-response";
import { serialize } from "@helpers/serialize";

import { LoginRequest } from "../requests/login.request";
import { LoginService } from "../services/login.service";
import { AdminSerialization } from "src/modules/console/common/serializers/admin.serialization";

@ControllerPrefix("/console/auth")
export class AuthController extends BaseController {
  private loginService: LoginService = new LoginService();

  public setRoutes(): void {
    this.router.post("/login", asyncHandler(this.login));
  }

  login = async (req: Request, res: Response) => {
    const loginRequest = await validateRequest(LoginRequest, req.body);
    const data = await this.loginService.login(loginRequest);
    const response = new JsonResponse({
      data: serialize(data.admin, AdminSerialization),
    });

    res.cookie("token", data.token, {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.json(response);
  };
}
