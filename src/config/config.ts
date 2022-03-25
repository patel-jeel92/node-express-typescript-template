import * as dotenv from 'dotenv';
import Joi from 'Joi';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object({
	NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
	PORT: Joi.number().default(6500),
}).unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}
export const config = {
	env: envVars.NODE_ENV,
	port: envVars.PORT,
};
