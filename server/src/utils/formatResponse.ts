import { Response } from "express";

export type ResponseObject = {
  res: Response;
  status?: number;
  error?: Error | string | null;
  result: unknown;
};

const formatResponse = (payload: ResponseObject): void => {
  const { res, result, error = null, status = 200 } = payload;
  res.status(status).json({
    status,
    result,
    error
  });
};

export default formatResponse;
