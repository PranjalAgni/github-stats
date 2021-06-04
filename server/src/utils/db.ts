import mongoose from "mongoose";
import logger from "./logger";
import config from "../config/";

const connectDB = async (): Promise<void> => {
  mongoose.connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  });
};

mongoose.connection.on("error", function (err) {
  logger.error(`Error connecting to DB: , ${err.stack}`);
});

mongoose.connection.on("disconnected", function () {
  logger.info(`Lost MongoDB connection. Retrying...`);
  connectDB();
});

mongoose.connection.on("connected", function () {
  logger.info("Connected to DB");
});

mongoose.connection.on("reconnected", function () {
  logger.info("Reconnected...");
});

// SIGINT signal works in linux
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    logger.info("Force to close the mongodb connection");
    process.exit(0);
  });
});

export default connectDB;
