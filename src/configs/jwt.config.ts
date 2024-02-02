import { Env } from "../lib/env/env";

export interface IJwtConfig {
  secret: string;
  expiresIn: string;
}

export const jwtConfig: IJwtConfig = {
  secret: Env.get("JWT_SECRET").toString(),
  expiresIn: Env.get("JWT_EXPIRES_IN").toString(),
};
