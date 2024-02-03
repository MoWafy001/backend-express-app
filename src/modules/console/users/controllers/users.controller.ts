import { UserSerialization } from "@common/serializers/user.serialization";
import { asyncHandler } from "@helpers/async-handler";
import { parsePaginationQuery } from "@helpers/pagination";
import { serialize } from "@helpers/serialize";
import { BaseController } from "@lib/controllers/controller.base";
import { ControllerMiddleware } from "@lib/decorators/controller-middleware.decorator";
import { ControllerPrefix } from "@lib/decorators/prefix.decorator";
import { validateRequest } from "@lib/error-handling/validate-request";
import { JsonResponse } from "@lib/responses/json-response";
import type { Request, Response } from "express";
import { AdminGuardMiddleware } from "modules/console/common/guards/admin-auth-guard";
import { CreateUserRequest } from "modules/console/modules/users/requests/create-user.request";
import { UpdateUserRequest } from "modules/console/modules/users/requests/update-user.request";
import { UsersService } from "modules/console/modules/users/services/users.service";

@ControllerPrefix("/console/users")
@ControllerMiddleware(AdminGuardMiddleware())
export class UsersControllers extends BaseController {
  private usersService: UsersService = new UsersService();

  public setRoutes(): void {
    this.router.post("/", asyncHandler(this.create));
    this.router.get("/", asyncHandler(this.list));
    this.router.get("/:userId", asyncHandler(this.get));
    this.router.patch("/:userId", asyncHandler(this.update));
    this.router.delete("/:userId", asyncHandler(this.delete));
  }

  create = async (req: Request, res: Response) => {
    const createUserRequest = await validateRequest(
      CreateUserRequest,
      req.body
    );
    const newUser = await this.usersService.create(createUserRequest);
    const response = new JsonResponse({
      data: serialize(newUser, UserSerialization),
    });

    return res.json(response);
  };

  list = async (req: Request, res: Response) => {
    const data = await this.usersService.findMany(
      parsePaginationQuery(req.query)
    );

    const response = new JsonResponse({
      data: serialize(data.data, UserSerialization),
      meta: {
        total: data.total,
        page: data.page,
        perPage: data.perPage,
      },
    });

    return res.json(response);
  };

  get = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const user = await this.usersService.findFirst({ uuid: userId });
    const response = new JsonResponse({
      data: serialize(user, UserSerialization),
    });

    return res.json(response);
  };

  update = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const updateUserRequest = validateRequest(UpdateUserRequest, req.body);
    const user = await this.usersService.update(
      { uuid: userId },
      updateUserRequest
    );
    const response = new JsonResponse({
      data: serialize(user, UserSerialization),
    });

    return res.json(response);
  };

  delete = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const user = await this.usersService.findFirst({
      uuid: userId,
    });
    await this.usersService.delete({ id: user.id });
    const response = new JsonResponse({
      data: serialize(user, UserSerialization),
    });

    return res.json(response);
  };
}
