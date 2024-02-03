import type { Request, Response } from "express";
import { BaseController } from "../../../../../lib/controllers/controller.base";
import { ControllerPrefix } from "../../../../../lib/decorators/prefix.decorator";
import { validateRequest } from "../../../../../lib/error-handling/validate-request";
import { asyncHandler } from "../../../../../helpers/async-handler";
import { serialize } from "../../../../../helpers/serialize";
import { JsonResponse } from "../../../../../lib/responses/json-response";
import { CreateUserRequest } from "../requests/create-user.request";
import { UpdateUserRequest } from "../requests/update-user.request";
import { ControllerMiddleware } from "../../../../../lib/decorators/controller-middleware.decorator";
import { parsePaginationQuery } from "../../../../../helpers/parse-pagiantion-query";
import { UsersService } from "../services/users.service";
import { AdminGuardMiddleware } from "../../../common/guards/admin-auth-guard";
import { UserSerialization } from "../../../../../common/serializers/user.serialization";

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
    const createUserRequest = validateRequest(CreateUserRequest, req.body);
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
