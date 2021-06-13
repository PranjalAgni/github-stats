import { Request, Response, NextFunction } from "express";
import logger from "./logger";

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404);
  return next(new Error(`Not Found ${req.originalUrl}`));
};

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error(error.stack);

  const statusCode = res.statusCode || 500;
  res.status(statusCode);
  res.json({
    status: statusCode,
    result: null,
    error: process.env.NODE_ENV === "production" ? true : error.stack
  });
  return next();
};
