import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { config } from '../config/config';
import { logger } from '../config/logger';
import { ApiError } from '../utils/ApiError';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
	let error = err;
	if (!(error instanceof ApiError)) {
		const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
		const message = error.message || httpStatus[statusCode];
		error = new ApiError(statusCode, message, false, err.stack);
	}
	next(error);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
	let { statusCode, message } = err;
	if (config.env === 'production' && !err.isOperational) {
		statusCode = httpStatus.INTERNAL_SERVER_ERROR;
		message = httpStatus['500'];
	}

	res.locals.errorMessage = err.message;

	const response = {
		code: statusCode,
		message,
		...(config.env === 'development' && { stack: err.stack }),
	};

	if (config.env === 'development') {
		logger.error(err);
	}

	res.status(statusCode).send(response);
};
