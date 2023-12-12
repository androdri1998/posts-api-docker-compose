import "dotenv/config";
import "reflect-metadata";
import config from "./src/config";
import fastify from "./src/server";
import { AppDataSource } from "./src/infra/databases/typeorm/data-source";

AppDataSource.initialize().catch((err) => console.log(err));

fastify.listen(
  { port: parseInt(config.appPort), host: config.nodeAppHost },
  function (err, _address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }
);
