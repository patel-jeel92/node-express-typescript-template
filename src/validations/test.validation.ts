import { NextFunction, Request, Response } from 'express';
import { param, validationResult } from 'express-validator';

export const validateRequest = [
	param('name').trim().not().isEmpty().withMessage('Name cannot be empty').bail(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
		next();
	},
];
