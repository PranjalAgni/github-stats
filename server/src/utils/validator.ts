import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import logger from "./logger";
import formatResponse from "./formatResponse";

export enum ValidationSource {
  BODY = "body",
  HEADER = "headers",
  QUERY = "query",
  PARAM = "params"
}

export default (
    schema: Joi.ObjectSchema,
    source: ValidationSource = ValidationSource.BODY
  ) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { error } = schema.validate(req[source]);

      if (!error) return next();

      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/['"]+/g, ""))
        .join(",");

      logger.error(message);

      return formatResponse({
        res,
        status: 400,
        result: {},
        error: message
      });
    } catch (error) {
      next(error);
    }
  };
