import { createConnection, Connection, getConnectionOptions } from "typeorm";

export default async (name = "default"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      name,
      database: defaultOptions.database,
    })
  );
};
