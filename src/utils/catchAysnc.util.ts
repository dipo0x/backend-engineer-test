import {Request, Response, NextFunction } from 'express'

type AsyncFunction<T = any, U = any, V = any> = (
  req: Request<T, U, V>,
  res: Response,
  next: NextFunction
) => Promise<any>;

const catchAsync = <T = any, U = any, V = any>(fn: AsyncFunction<T, U, V>) => {
  return async (req: Request<T, U, V>, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;