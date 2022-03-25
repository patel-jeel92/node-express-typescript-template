import winston from 'winston';
import { config } from './config';

const options = {
	file: {
		level: 'info',
		filename: './logs/app.log',
		handleExceptions: true,
		json: true,
		colorize: false,
	},
	console: {
		level: 'debug',
		handleExceptions: true,
		json: false,
		colorize: true,
	},
};

const enumerateErrorFormat = winston.format((info) => {
	if (info instanceof Error) {
		Object.assign(info, { message: info.stack });
	}
	return info;
});

export const logger = winston.createLogger({
	level: config.env === 'development' ? 'debug' : 'info',
	format: winston.format.combine(
		enumerateErrorFormat(),
		config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
		winston.format.splat(),
		winston.format.printf(({ level, message }) => `${level}: ${message}`)
	),

	transports: [new winston.transports.File(options.file), new winston.transports.Console(options.console)],
});
