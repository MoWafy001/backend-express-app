import request from "supertest";
import express from "express";
import { Express } from "express-serve-static-core";
import { loggerMiddleware } from "../../../src/middlewares/logger.middleware";
import { setAppRoutes } from "../../../src/routes";
import cors from "cors";
import { sign } from "jsonwebtoken";
import { config } from "../../../src/configs/config";
import { prisma } from "../../../src/database/prisma";
import { Prisma } from "@prisma/client";
import { CreateAdminRequest } from "../../../src/modules/console/modules/admins/requests/create-admin.request";
import { UpdateAdminRequest } from "../../../src/modules/console/modules/admins/requests/update-admin.request";
import { IJwtLoginPayload } from "../../../src/common/interfaces/jwt-login-payload.interface";
import { Role } from "../../../src/common/enums/role.enum";

describe("AdminsController", () => {
  let app: Express;
  let token: string;
  let testAdmin: Prisma.AdminGetPayload<{}>;

  beforeAll(async () => {
    const superAdmin = await prisma.admin.findFirstOrThrow({
      where: { role: Role.SUPER_ADMIN },
    });

    token = sign(
      {
        id: superAdmin.uuid,
        email: superAdmin.email,
        name: superAdmin.name,
        type: "admin",
        role: superAdmin.role as Role,
      } satisfies IJwtLoginPayload,
      config.jwt.secret,
      {
        expiresIn: config.jwt.expiresIn,
      }
    );

    testAdmin = await prisma.admin.create({
      data: {
        name: "Test Admin",
        email: `testAdmin${Date.now()}@app.com`,
        password: "password",
        role: Role.ADMIN,
      },
    });

    // set up express server
    app = express();

    // set up middlewares
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(loggerMiddleware);

    // set up routes
    setAppRoutes(app);
  });

  describe("POST /console/admins", () => {
    it("should create a new admin", async () => {
      // Create a new admin request
      const createAdminRequest: CreateAdminRequest = {
        name: "New Admin",
        email: `newAdmin${Date.now()}@app.com`,
        password: "password",
        role: Role.ADMIN,
      };

      // Send a request to create a new admin
      const response = await request(app)
        .post("/api/v1/console/admins")
        .set("Cookie", [`token=${token}`])
        .send(createAdminRequest);

      console.log(response.body);

      // Assert the response status code and the created admin in the response body
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe("GET /console/admins", () => {
    it("should get a list of admins", async () => {
      // Send a request to get the list of admins
      const response = await request(app)
        .get("/api/v1/console/admins")
        .set("Cookie", [`token=${token}`]);

      // Assert the response status code and the list of admins in the response body
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe("GET /console/admins/:adminId", () => {
    it("should get a admin by ID", async () => {
      // Get the ID of an existing admin
      const adminId = testAdmin.uuid;

      // Send a request to get the admin by ID
      const response = await request(app)
        .get(`/api/v1/console/admins/${adminId}`)
        .set("Cookie", [`token=${token}`]);

      // Assert the response status code and the admin in the response body
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe("PATCH /console/admins/:adminId", () => {
    it("should update a admin", async () => {
      // Get the ID of an existing admin
      const adminId = testAdmin.uuid;

      // Create an update admin request
      const updateAdminRequest: UpdateAdminRequest = {
        name: "Updated Admin",
      };

      // Send a request to update the admin
      const response = await request(app)
        .patch(`/api/v1/console/admins/${adminId}`)
        .set("Cookie", [`token=${token}`])
        .send(updateAdminRequest);

      // Assert the response status code and the updated admin in the response body
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe("DELETE /console/admins/:adminId", () => {
    it("should delete a admin", async () => {
      // Get the ID of an existing admin
      const adminId = testAdmin.uuid;

      // Send a request to delete the admin
      const response = await request(app)
        .delete(`/api/v1/console/admins/${adminId}`)
        .set("Cookie", [`token=${token}`]);

      // Assert the response status code and the deleted admin the response body
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });
});
