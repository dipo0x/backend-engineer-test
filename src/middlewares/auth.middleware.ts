import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../helpers/error.handler';
import { User } from "../modules/user/models/user.model";

const authMiddleware = {
  async authenticateRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization || req.headers.Authorization;

      if (!token) {
        return next(ApiError(400, 'No Authorization was provided', res));
      }

      const decoded = jwt.verify(token as string, String(process.env.ACCESS_TOKEN_PRIVATE_KEY)) as JwtPayload;
      const user = await User.findById(decoded._id);

      if (!user) {
        return next(ApiError(400, 'Login to proceed', res));
      }

      req.user = user;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return next(ApiError(400, 'Session expired, please login again', res));
      }
      if (error instanceof jwt.JsonWebTokenError) {
        return next(ApiError(400, 'Invalid token, please login again', res));
      }

      console.error(error);
      return next(ApiError(400, 'Login to proceed', res));
    }
  },
};

export default authMiddleware;
