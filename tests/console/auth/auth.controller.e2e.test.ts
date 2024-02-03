import request from "supertest";
import express from "express";
import { Express } from "express-serve-static-core";
import { loggerMiddleware } from "../../../src/middlewares/logger.middleware";
import { getCook } from "../../../src/helpers/cookie";
import { setAppRoutes } from "../../../src/routes";
import cors from "cors";

describe("AdminsAuthController", () => {
  let app: Express;

  beforeAll(async () => {
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

  describe("POST /console/auth/login", () => {
    it("should login successfully and return a token", async () => {
      // Send a request to the login endpoint
      const response = await request(app)
        .post("/api/v1/console/auth/login")
        .send({ email: "super@app.com", password: "password" });

      // Assert the response status code and token in the response body
      expect(response.status).toBe(200);
      expect(getCook("token", response.headers["set-cookie"])).toBeDefined();
    });

    it("should return an error if login request is invalid", async () => {
      // Send an invalid login request
      const response = await request(app)
        .post("/api/v1/console/auth/login")
        .send({ email: "admin@app.com", password: "wrongpass" });

      // Assert the response status code and error message
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid Credentials");
    });
  });
});
