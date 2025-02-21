import express, { Application, Request, Response, NextFunction } from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import connectToDatabase from './config/database.config';
import logger from './utils/logger.util';
import dotenv from 'dotenv';
import userRoute from './modules/user/user.route'
import productRoute from './modules/product/product.route'
dotenv.config();

  const app: Application = express();

  const initializeMiddleware = (): void => {
    app.use(helmet());
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(compression());
    app.disable('x-powered-by');
    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/product', productRoute);
  };

  const initializeErrorHandling = (): void => {
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      logger.error(err);
      res.status(500).send({
        status: 500,
        success: false,
        message: 'Something went wrong',
      });
    });

    app.use((req, res, next) => {
      res.status(404).send({
        status: 404,
        success: false,
        message: 'Page not found',
      });
    });
  };


  initializeMiddleware();
  initializeErrorHandling();

  async function start () {
    await connectToDatabase();
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on Port ${process.env.PORT}`);
    });
  };

start()

export default app;