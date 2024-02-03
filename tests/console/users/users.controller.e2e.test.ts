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
import { CreateUserRequest } from "../../../src/modules/console/modules/users/requests/create-user.request";
import { UpdateUserRequest } from "../../../src/modules/console/modules/users/requests/update-user.request";
import { IJwtLoginPayload } from "../../../src/common/interfaces/jwt-login-payload.interface";
import { Role } from "../../../src/common/enums/role.enum";

describe("UsersController", () => {
  let app: Express;
  let token: string;
  let testUser: Prisma.UserGetPayload<{}>;

  beforeAll(async () => {
    const admin = await prisma.admin.findFirstOrThrow();
    token = sign(
      {
        id: admin.uuid,
        email: admin.email,
        name: admin.name,
        type: "admin",
        role: admin.role as Role,
      } satisfies IJwtLoginPayload,
      config.jwt.secret,
      {
        expiresIn: config.jwt.expiresIn,
      }
    );

    testUser = await prisma.user.create({
      data: {
        name: "Test User",
        email: `testUser${Date.now()}@app.com`,
        password: "password",
        mobile: "+2011278" + Math.floor(Math.random() * 10000),
        country: "Egypt",
        dateOfBirth: new Date(),
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

  describe("POST /console/users", () => {
    it("should create a new user", async () => {
      // Create a new user request
      const createUserRequest: CreateUserRequest = {
        name: "New User",
        email: `newUser${Date.now()}@app.com`,
        password: "password",
        mobile: "+201172189" + (Math.floor(Math.random() * 1000)).toString(),
        country: "Egypt",
        dateOfBirth: new Date(),
      };

      // Send a request to create a new user
      const response = await request(app)
        .post("/api/v1/console/users")
        .set("Cookie", [`token=${token}`])
        .send(createUserRequest);

        console.log(response.body);
        

      // Assert the response status code and the created user in the response body
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe("GET /console/users", () => {
    it("should get a list of users", async () => {
      // Send a request to get the list of users
      const response = await request(app)
        .get("/api/v1/console/users")
        .set("Cookie", [`token=${token}`]);

      // Assert the response status code and the list of users in the response body
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe("GET /console/users/:userId", () => {
    it("should get a user by ID", async () => {
      // Get the ID of an existing user
      const userId = testUser.uuid;

      // Send a request to get the user by ID
      const response = await request(app)
        .get(`/api/v1/console/users/${userId}`)
        .set("Cookie", [`token=${token}`]);

      // Assert the response status code and the user in the response body
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe("PATCH /console/users/:userId", () => {
    it("should update a user", async () => {
      // Get the ID of an existing user
      const userId = testUser.uuid;

      // Create an update user request
      const updateUserRequest: UpdateUserRequest = {
        name: "Updated User",
        mobile: "+201100220000",
        country: "Egypt",
      };

      // Send a request to update the user
      const response = await request(app)
        .patch(`/api/v1/console/users/${userId}`)
        .set("Cookie", [`token=${token}`])
        .send(updateUserRequest);

      // Assert the response status code and the updated user in the response body
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });

  describe("DELETE /console/users/:userId", () => {
    it("should delete a user", async () => {
      // Get the ID of an existing user
      const userId = testUser.uuid;

      // Send a request to delete the user
      const response = await request(app)
        .delete(`/api/v1/console/users/${userId}`)
        .set("Cookie", [`token=${token}`]);

      // Assert the response status code and the deleted user in the response body
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });
});
