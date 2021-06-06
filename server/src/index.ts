import config from "./config";
import initalizeServer from "./server";
import logger from "./utils/logger";

const startServer = async () => {
  const app = await initalizeServer();
  app.listen(config.port, () => {
    logger.info(
      `Server running on http://localhost:${config.port} in ${config.env} mode`
    );
  });
};

// this will catch any uncaught exception in the server
process.on("uncaughtException", (e) => {
  logger.error(e);
});

startServer();
