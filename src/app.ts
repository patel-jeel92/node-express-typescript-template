import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';
import { config } from './config/config';
import * as morgan from './config/morgan';
import { errorConverter, errorHandler } from './middlewares/error';
import { metricsMiddleware } from './middlewares/metrics';
import { routes } from './routes/v1';
import { ApiError } from './utils/ApiError';
export const app: Application = express();

if (config.env !== 'test') {
	app.use(morgan.successHandler);
	app.use(morgan.errorHandler);
}
// set security HTTP headers
app.use(helmet({ contentSecurityPolicy: false }));

// parse json request body
app.use(express.json());

// enable cors
const corsOptions = {
	origin: 'http://localhost:9000',
	optionsSuccessStatus: 200, // For legacy browser support
	methods: 'GET',
};
app.use(cors(corsOptions));

// Metrics
app.use(metricsMiddleware);

// Routes
app.use('/api/v1', routes);

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
	next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
