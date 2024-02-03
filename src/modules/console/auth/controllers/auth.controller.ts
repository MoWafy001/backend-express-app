import type { Request, Response } from "express";
import { BaseController } from "../../../../lib/controllers/controller.base";
import { ControllerPrefix } from "../../../../lib/decorators/prefix.decorator";
import { validateRequest } from "../../../../lib/error-handling/validate-request";
import { LoginRequest } from "../requests/login.request";
import { LoginService } from "../services/login.service";
import { asyncHandler } from "../../../../helpers/async-handler";
import { serialize } from "../../../../helpers/serialize";
import { AdminSerialization } from "../serializers/admin.serialization";
import { JsonResponse } from "../../../../lib/responses/json-response";

@ControllerPrefix("/console/auth")
export class AuthController extends BaseController {
  private loginService: LoginService = new LoginService();

  public setRoutes(): void {
    this.router.post("/login", asyncHandler(this.login));
  }

  login = async (req: Request, res: Response) => {    
    const loginRequest = validateRequest(LoginRequest, req.body);
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
