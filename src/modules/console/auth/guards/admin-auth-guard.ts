import { JwtPayload, verify } from "jsonwebtoken";
import { config } from "../../../../configs/config";
import { HttpError } from "../../../../lib/error-handling/http-error";
import { Request } from "express";
import { getCook } from "../../../../helpers/cookie";
import { IJwtLoginPayload } from "../interfaces/jwt-login-payload.interface";
import { Role } from "../../../../common/enums/role.enum";

type AdminGuardMiddlewareProps = {
  roles?: Role[];
};

export const AdminGuardMiddleware =
  ({ roles }: AdminGuardMiddlewareProps) =>
  (req: Request, res, next) => {
    // get token from cookie
    const token = getCook("token", req.headers.cookie);
    let payload: IJwtLoginPayload;

    // validate token
    if (!token) {
      throw new HttpError(401, "Unauthorized");
    }

    try {
      payload = verify(token, config.jwt.secret) as IJwtLoginPayload;
    } catch (err) {
      throw new HttpError(401, "Unauthorized");
    }

    if (payload.type !== "admin") {
      throw new HttpError(401, "Unauthorized");
    }

    // check roles
    if (roles && roles.length > 0) {
      if (!roles.includes(payload.role)) {
        throw new HttpError(401, "Unauthorized");
      }
    }

    // inject payload in request
    (req as unknown as { jwtPayload: JwtPayload }).jwtPayload = payload;

    // go on
    next();
  };
