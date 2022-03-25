import express from 'express';
import { router as helloRoute } from './test.route';

export const routes = express.Router();

const defaultRoutes = [
	{
		path: '/users',
		route: helloRoute,
	},
];

defaultRoutes.forEach((route) => {
	routes.use(route.path, route.route);
});
