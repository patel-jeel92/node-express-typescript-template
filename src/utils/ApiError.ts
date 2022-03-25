import httpStatus from 'http-status';
export class ApiError extends Error {
	public readonly statusCode: number;

	public readonly isOperational: boolean;

	constructor(
		statusCode: number,
		message: string | number | httpStatus.HttpStatusClasses | httpStatus.HttpStatusExtra,
		isOperational = true,
		stack = ''
	) {
		super(message.toString());

		// Set the prototype explicitly.
		Object.setPrototypeOf(this, ApiError.prototype);

		this.statusCode = statusCode;
		this.isOperational = isOperational;
		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
