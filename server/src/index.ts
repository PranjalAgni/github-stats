import config from "./config";
import initalizeServer from "./server";
import logger from "./utils/logger";

const startServer = () => {
  const app = initalizeServer();
  app.listen(config.port, () => {
    logger.info(
      `Server running on http://localhost:${config.port} in ${config.env} mode`
    );
  });
};

startServer();
