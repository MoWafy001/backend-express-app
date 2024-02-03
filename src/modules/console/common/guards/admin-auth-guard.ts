import { JwtPayload, verify } from "jsonwebtoken";
import { Request } from "express";
import { IJwtLoginPayload } from "@common/interfaces/jwt-login-payload.interface";
import { getCook } from "@helpers/cookie";
import { Role } from "@common/enums/role.enum";
import { HttpError } from "@lib/error-handling/http-error";
import { config } from "@configs/config";

type AdminGuardMiddlewareProps = {
  roles?: Role[];
};

export const AdminGuardMiddleware =
  (props?: AdminGuardMiddlewareProps) => (req: Request, res, next) => {
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
    if (props?.roles && props?.roles.length > 0) {
      if (!props.roles.includes(payload.role)) {
        throw new HttpError(401, "Unauthorized");
      }
    }

    // inject payload in request
    (req as unknown as { jwtPayload: JwtPayload }).jwtPayload = payload;

    // go on
    next();
  };
