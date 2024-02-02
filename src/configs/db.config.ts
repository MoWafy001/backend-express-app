import { Env } from "../lib/env/env";

export interface IDbConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
}

export const dbConfig: IDbConfig = {
  type: Env.get("DB_TYPE").toString(),
  host: Env.get("DB_HOST").toString(),
  port: Env.get("DB_PORT").toNumber(),
  username: Env.get("DB_USERNAME").toString(),
  password: Env.get("DB_PASSWORD").toString(),
  database: Env.get("DB_DATABASE").toString(),
  synchronize: Env.get("DB_SYNCHRONIZE", false).toBoolean(),
  logging: Env.get("DB_LOGGING", false).toBoolean(),
};
