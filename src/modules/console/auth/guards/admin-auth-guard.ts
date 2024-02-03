import { verify } from "jsonwebtoken";
import { config } from "../../../../configs/config";
import { HttpError } from "../../../../lib/error-handling/http-error";
import { Request } from "express";
import { getCook } from "../../../../helpers/cookie";

export const AdminGuardMiddleware = (req: Request, res, next) => {
  // get token from cookie
  const token = getCook("token", req.headers.cookie);

  // validate token
  if (!token) {
    throw new HttpError(401, "Unauthorized");
  }

  try {
    verify(token, config.jwt.secret);
  } catch (err) {
    throw new HttpError(401, "Unauthorized");
  }

  // go on
  next();
};
