import { Env } from "../lib/env/env";
import dotenv from "dotenv";
dotenv.config();

export interface Config {
  port: number;
  db: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging: boolean;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

export const config: Config = {
  port: Env.get("PORT", 4000).toNumber(),
  db: {
    type: Env.get("DB_TYPE").toString(),
    host: Env.get("DB_HOST").toString(),
    port: Env.get("DB_PORT").toNumber(),
    username: Env.get("DB_USERNAME").toString(),
    password: Env.get("DB_PASSWORD").toString(),
    database: Env.get("DB_DATABASE").toString(),
    synchronize: Env.get("DB_SYNCHRONIZE", false).toBoolean(),
    logging: Env.get("DB_LOGGING", false).toBoolean(),
  },
  jwt: {
    secret: Env.get("JWT_SECRET").toString(),
    expiresIn: Env.get("JWT_EXPIRES_IN").toString(),
  },
};
