import path from "path";
import dotenv from "dotenv";

dotenv.config();

const appRoot = path.join("../", "../");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
  isDev: process.env.NODE_ENV === "development",
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  github: {
    base: "https://api.github.com"
  },
  db: {
    url: process.env.MONGODB_URL
  },
  winston: {
    file: {
      level: "info",
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false
    },
    console: {
      level: "debug",
      handleExceptions: true,
      json: false,
      colorize: true
    }
  }
};
