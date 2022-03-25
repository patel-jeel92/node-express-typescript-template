import express from 'express';
import * as testController from '../../controllers/test.controller';
import * as testValidation from '../../validations/test.validation';
export const router = express.Router();

router.route('/:name').get(testValidation.validateRequest, testController.helloWorld);
