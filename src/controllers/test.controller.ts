import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';

export const helloWorld = catchAsync(async (req: Request, res: Response) => {
	res.send(`Hello ${req.params.name}`);
});
