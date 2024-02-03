import request from "supertest";
import express from "express";
import { Express } from "express-serve-static-core";
import { loggerMiddleware } from "../../../src/middlewares/logger.middleware";
import { getCook } from "../../../src/helpers/cookie";
import { setAppRoutes } from "../../../src/routes";
import cors from "cors";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../src/database/prisma";

describe("UsersAuthController", () => {
  let app: Express;
  let userToLogin: Prisma.UserGetPayload<{}>;

  beforeAll(async () => {
    userToLogin = await prisma.user.findFirstOrThrow();

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

  describe("POST /users/auth/login", () => {
    it("should login successfully and return a token", async () => {
      // Send a request to the login endpoint
      const response = await request(app)
        .post("/api/v1/users/auth/login")
        .send({ email: userToLogin.email, password: "password" });

      // Assert the response status code and token in the response body
      expect(response.status).toBe(200);
      expect(getCook("token", response.headers["set-cookie"])).toBeDefined();
    });

    it("should return an error if login request is invalid", async () => {
      // Send an invalid login request
      const response = await request(app)
        .post("/api/v1/users/auth/login")
        .send({ email: "wrongemail@app.com", password: "wrongpass" });

      // Assert the response status code and error message
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid Credentials");
    });
  });

  describe("POST /users/auth/register", () => {
    it("should register a new user successfully", async () => {
      // Create a new user request
      const createUserRequest = {
        name: "New User",
        email: `newUser${Date.now()}@app.com`,
        password: "password",
        mobile: "+201172189" + Math.floor(Math.random() * 1000),
        country: "Egypt",
      };

      // Send a request to create a new user
      const response = await request(app)
        .post("/api/v1/users/auth/register")
        .send(createUserRequest);

      // Assert the response status code and the created user in the response body
      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });

    it("should return a validation error", async () => {
      // Send an invalid register request
      const response = await request(app)
        .post("/api/v1/users/auth/register")
        .send({ name: "New User" });

      // Assert the response status code and error message
      expect(response.status).toBe(422);
    });
  });
});
