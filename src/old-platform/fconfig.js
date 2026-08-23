
	  const production = process.env.NODE_ENV === 'production';
	  const instance = 'isc';
	  const CSRF_TOKEN='XSRF-TOKEN';
	  const domain = 'localhost';
	  const REFRESH_INTERVAL=180000;
	  const port = 7000;

	  if (new String(process.env.BACKEND_HOST).trim() == null || new String(new String(process.env.BACKEND_HOST).trim()).trim().length == 0) {
		  console.error("Missing new String(process.env.BACKEND_HOST).trim()");
	  }

	  if (new String(process.env.BACKEND_PORT).trim() == null || new String(new String(process.env.BACKEND_PORT).trim()).trim().length == 0) {
		  console.error("Missing new String(process.env.BACKEND_PORT).trim()");
	  }


	 const reactServerSideConfig = {
	 	serverContextPath: `http://${new String(process.env.BACKEND_HOST).trim()}:${new String(process.env.BACKEND_PORT).trim()}`,
	 	graphqlServerUrl: `http://${new String(process.env.BACKEND_HOST).trim()}:${new String(process.env.BACKEND_PORT).trim()}/api/graphql`,
	 	elasticProxyUrl: `http://${new String(process.env.BACKEND_HOST).trim()}:${new String(process.env.BACKEND_PORT).trim()}/api/es`,
		ServerUrl:  `http://${new String(process.env.BACKEND_HOST).trim()}:${new String(process.env.BACKEND_PORT).trim()}/api/`,

		serverUrl:  `http://${new String(process.env.BACKEND_HOST).trim()}:${new String(process.env.BACKEND_PORT).trim()}/api/`,
		 iconUrl: production ? `` : `http://${domain}:${port}`,
		 theme:'bank',
		 instance:new String(process.env.SINA_INSTANCE).trim(),
		 CSRF_TOKEN:new String(process.env.CSRF_TOKEN).trim(),
		 REFRESH_INTERVAL:new String(process.env.UI_REFRESH_INTERVAL).trim(),
		 ISC_SERVER_URL:new String(process.env.ISC_SERVER_URL).trim(),
		 APPLICATION_VERSION:new String(process.env.APPLICATION_VERSION).trim(),
		 BACKEND_VERSION:new String(process.env.BACKEND_VERSION).trim(),
		 EXPORT_CHART_URL:production ? `/export-server/` : 'http://localhost:9090/export-server',
	 }

	 export const reactClientSideConfig = {
        serverContextPath: production ? '' : `http://${new String(process.env.BACKEND_HOST).trim()}:${new String(process.env.BACKEND_PORT).trim()}`,
	 	graphqlServerUrl: production ? `/api/graphql` : `http://${new String(process.env.BACKEND_HOST).trim()}:${new String(process.env.BACKEND_PORT).trim()}/api/graphql`,
	 	elasticProxyUrl:  production ? `/api/es` : `http://${new String(process.env.BACKEND_HOST).trim()}:${new String(process.env.BACKEND_PORT).trim()}/api/es`,
		ServerUrl:  production  ?  '/api/' : `http://${new String(process.env.BACKEND_HOST).trim()}:${new String(process.env.BACKEND_PORT).trim()}/api/`,
		serverUrl:  production  ?  '/api/' : `http://${new String(process.env.BACKEND_HOST).trim()}:${new String(process.env.BACKEND_PORT).trim()}/api/`,
		 iconUrl: production ? `` : `http://${domain}:${port}`,
		 MonitoringInterval : 600000,//10 min - 600000
		 NotificationInterval : 600000,//10 min - 600000
		 SessionIdleInterval : 1800000,//1800000 30 min
		theme:'bsi',
		logo: '/assets/img/bank.png',
		instance:new String(process.env.SINA_INSTANCE).trim(),
		CSRF_TOKEN:new String(process.env.CSRF_TOKEN).trim(),
		 REFRESH_INTERVAL:process.env.UI_REFRESH_INTERVAL ? new String(process.env.UI_REFRESH_INTERVAL).trim(): REFRESH_INTERVAL,
		ISC_SERVER_URL:new String(process.env.ISC_SERVER_URL).trim(),
		APPLICATION_VERSION:new String(process.env.APPLICATION_VERSION).trim(),
		BACKEND_VERSION:new String(process.env.BACKEND_VERSION).trim(),
		 EXPORT_CHART_URL:production ? `/export-server/` : 'http://localhost:9090/export-server',
	 };
	 export default reactServerSideConfig;
