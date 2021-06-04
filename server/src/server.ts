import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import { loggerStreamWrite } from "./utils/logger";
import router from "./routes/";

const initalizeServer = (): Application => {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(compression());

  // streaming morgan request logging through our app logger which is winston
  app.use(
    morgan("combined", {
      stream: {
        write: loggerStreamWrite
      }
    })
  );

  // mounting root router which is prefixed with "/api"
  // This will ensure every API route starts with "/api"
  app.use("/api", router);

  return app;
};

export default initalizeServer;
