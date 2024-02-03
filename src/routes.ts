import { Router, Express, NextFunction, Request, Response } from "express";

import * as glob from "glob";
import path from "path";
import { BaseController } from "./lib/controllers/controller.base";
import { HttpError } from "./lib/error-handling/http-error";

export const setAppRoutes = async (app: Express) => {
  const mainRouter = Router();

  await importControllers(mainRouter);
  setCustomRoutes(mainRouter);

  app.use("/api/v1", mainRouter);
};

/* custom routes */

const setCustomRoutes = (router: Router) => {
  router.get("/health", (_req: any, res: any) => {
    res
      .status(200)
      .json({ success: true, message: "Server is up!", code: 200 });
  });

  router.use((req: Request, res: Response, next: NextFunction) => {
    const err = new HttpError(404, "Not Found");
    next(err);
  });

  router.use((err: any, req: Request, res: Response, next: NextFunction) => {
    try {
      err.message = JSON.parse(err.message);
    } catch (error) {}

    res.status(err.status || 500).json({
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    });

    console.error(err.message, err.stack);
  });
};

/* importing all controllers */

const findControllerFiles = (): string[] => {
  return glob.sync(`./**/*.controller.{ts,js}`, {}).map((file) => {
    return path.resolve(file);
  });
};

const importControllers = async (router: Router) => {
  const files = findControllerFiles();

  await Promise.all(
    files.map(async (file) => {
      const controllerClass = await importController(file);

      if (!controllerClass) return;
      const controller: BaseController = new (controllerClass as any)();
      controller.setRoutes();
      router.use(controller.prefix, controller.router);
    })
  );
};

const importController = async (file: string) => {
  const controllers = Object.values(await import(file));
  return controllers.find(
    (controller: { prototype: typeof BaseController }) =>
      controller.prototype instanceof BaseController
  ) as typeof BaseController;
};
