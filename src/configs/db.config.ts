import { Env } from "../lib/env/env";

export interface IDbConfig {
  databaseUrl?: string;
}

export const dbConfig: IDbConfig = {
  databaseUrl: Env.get("DATABASE_URL").toString(),
};
