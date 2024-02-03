import type { Request, Response } from "express";
import { AdminsService } from "../services/admins.service";
import { CreateAdminRequest } from "../requests/create-admin.request";
import { AdminSerialization } from "../../../common/serializers/admin.serialization";
import { UpdateAdminRequest } from "../requests/update-admin.request";
import { AdminGuardMiddleware } from "../../../common/guards/admin-auth-guard";
import { Role } from "../../../../../common/enums/role.enum";
import { asyncHandler } from "../../../../../helpers/async-handler";
import { parsePaginationQuery } from "../../../../../helpers/parse-pagiantion-query";
import { BaseController } from "../../../../../lib/controllers/controller.base";
import { ControllerMiddleware } from "../../../../../lib/decorators/controller-middleware.decorator";
import { ControllerPrefix } from "../../../../../lib/decorators/prefix.decorator";
import { validateRequest } from "../../../../../lib/error-handling/validate-request";
import { JsonResponse } from "../../../../../lib/responses/json-response";
import { serialize } from "../../../../../helpers/serialize";

@ControllerPrefix("/console/admins")
@ControllerMiddleware(AdminGuardMiddleware({ roles: [Role.SUPER_ADMIN] }))
export class AdminsControllers extends BaseController {
  private adminsService: AdminsService = new AdminsService();

  public setRoutes(): void {
    this.router.post("/", asyncHandler(this.create));
    this.router.get("/", asyncHandler(this.list));
    this.router.get("/:adminId", asyncHandler(this.get));
    this.router.patch("/:adminId", asyncHandler(this.update));
    this.router.delete("/:adminId", asyncHandler(this.delete));
  }

  create = async (req: Request, res: Response) => {
    const createAdminRequest = validateRequest(CreateAdminRequest, req.body);
    const newAdmin = await this.adminsService.create(createAdminRequest);
    const response = new JsonResponse({
      data: serialize(newAdmin, AdminSerialization),
    });

    return res.json(response);
  };

  list = async (req: Request, res: Response) => {
    const data = await this.adminsService.findMany(
      parsePaginationQuery(req.query)
    );

    const response = new JsonResponse({
      data: serialize(data.data, AdminSerialization),
      meta: {
        total: data.total,
        page: data.page,
        perPage: data.perPage,
      },
    });

    return res.json(response);
  };

  get = async (req: Request, res: Response) => {
    const adminId = req.params.userId;
    const admin = await this.adminsService.findFirst({ uuid: adminId });
    const response = new JsonResponse({
      data: serialize(admin, AdminSerialization),
    });

    return res.json(response);
  };

  update = async (req: Request, res: Response) => {
    const adminId = req.params.adminId;
    const updateAdminRequest = validateRequest(UpdateAdminRequest, req.body);
    const admin = await this.adminsService.update(
      { uuid: adminId },
      updateAdminRequest
    );
    const response = new JsonResponse({
      data: serialize(admin, AdminSerialization),
    });

    return res.json(response);
  };

  delete = async (req: Request, res: Response) => {
    const adminId = req.params.userId;
    const admin = await this.adminsService.findFirst({
      uuid: adminId,
    });
    await this.adminsService.delete({ id: admin.id });
    const response = new JsonResponse({
      data: serialize(admin, AdminSerialization),
    });

    return res.json(response);
  };
}
