import promBundle from 'express-prom-bundle';

export const metricsMiddleware = promBundle({
	includeMethod: true,
	includePath: true,
	includeStatusCode: true,
	includeUp: true,
	customLabels: { project_name: 'demo-express-api', project_type: '' },
	promClient: {
		collectDefaultMetrics: {},
	},
});
