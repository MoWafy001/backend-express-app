import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "../configs/config";

const options: DataSourceOptions = config.db as DataSourceOptions;
export const dataSource = new DataSource(options);

export const databaseInit = async () => {
  console.log("Initializing database...");
  await dataSource.initialize().catch((err) => {
    console.error("Failed to initialize database");
    console.error(err);
    process.exit(1);
  });
  console.log("Database initialized");
};
