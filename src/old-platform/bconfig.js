
	 const production = process.env.NODE_ENV === 'production';

	 if (process.env.BACKEND_HOST == null || new String(process.env.BACKEND_HOST).trim().length == 0) {
	 	console.error("Missing process.env.BACKEND_HOST");
	 }

	 if (process.env.BACKEND_PORT == null || new String(process.env.BACKEND_PORT).trim().length == 0) {
		 console.error("Missing process.env.BACKEND_PORT");
	 }

	 if (process.env.FRONTEND_PORT == null || new String(process.env.FRONTEND_PORT).trim().length == 0) {
		 console.error("Missing process.env.FRONTEND_PORT");
	 }

	 if (process.env.FRONTEND_HOST == null || new String(process.env.FRONTEND_HOST).trim().length == 0) {
		 console.error("Missing process.env.FRONTEND_HOST. using localhost");
	 }


	 const env = {
	 	graphqlServerUrl: `http://${new String(process.env.BACKEND_HOST).trim()}:${new String(process.env.BACKEND_PORT).trim()}/api/graphql`,

		//frontend port
	 	port: `${new String(process.env.FRONTEND_PORT).trim()}`,

		//frontend domain
	 	domain: `localhost`,
		title: 'shahyar',
		favicon: '/assets/img/business/bank-favicon.ico',
		 instance:new String(process.env.SINA_INSTANCE).trim(),
		 CSRF_TOKEN:new String(process.env.CSRF_TOKEN).trim(),
		 REFRESH_INTERVAL:process.env.UI_REFRESH_INTERVAL ? new String(process.env.UI_REFRESH_INTERVAL).trim(): 180000,
		 frontendHost: process.env.FRONTEND_HOST == null || new String(process.env.FRONTEND_HOST).trim().length == 0 ? "localhost" :
			 new String(process.env.FRONTEND_HOST).trim()
	 }

	 export default env;

