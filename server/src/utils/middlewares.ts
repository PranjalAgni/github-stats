import { Request, Response, NextFunction } from "express";

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
  const statusCode = res.statusCode || 500;
  res.status(statusCode);
  res.json({
    status: statusCode,
    result: null,
    error: process.env.NODE_ENV === "production" ? true : error.stack
  });
  return next();
};
