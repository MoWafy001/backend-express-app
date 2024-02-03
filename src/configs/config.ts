import { Env } from "@lib/env/env";
import { IDbConfig, dbConfig } from "./db.config";
import { IJwtConfig, jwtConfig } from "./jwt.config";

export interface Config {
  port: number;
  db: IDbConfig;
  jwt: IJwtConfig;
}

export const config: Config = {
  port: Env.get("PORT", 4000).toNumber(),
  db: dbConfig,
  jwt: jwtConfig,
};
