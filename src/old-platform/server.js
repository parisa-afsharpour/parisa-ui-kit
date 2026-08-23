import { createHistoryEnhancer, queryMiddleware } from 'farce';
import createMatchEnhancer from 'found/lib/createMatchEnhancer';
import foundReducer from 'found/lib/foundReducer';
import Matcher from 'found/lib/Matcher';
import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import createRender from 'found/lib/createRender';
import express from 'express';
import { Actions as FarceActions, ServerProtocol } from 'farce';
import { getStoreRenderArgs, RedirectException } from 'found';
import { RouterProvider } from 'found/lib/server';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';

import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { Resolver } from 'found-relay';
import jdenticon from 'jdenticon';
import platformReducers from "./platformReducers";
import sinaReducers from "../sina/sinaReducers";
import umReducers from "../user-management/umReducers";
import config from './bconfig';
//import routeConfig from './routeConfig';
import { routeConfig } from './router';
import bconfig from './bconfig';
import { reactClientSideConfig as fconfig } from './fconfig';
//import { createNewEnvironment, createNewFetcher } from './createEnvironment';
import path from 'path';
import cookieParser from 'cookie-parser';
import { ServerFetcher } from '../user-management/fetcher';
import thunk from 'redux-thunk';
import {sampleFetch, error } from '../user-management/store/counterStore';


function renderPageToString(element, state, dir, fetcher) {

return (`
	<!DOCTYPE html>
	<html dir="${dir.dir}" >

	<head>
	  <meta charset="utf-8">
	  <title>${config.title}</title>
	  <link rel="shortcut icon" href=${config.favicon} />

	  ${process.env.NODE_ENV === 'production' ? '<link rel="stylesheet" href="/build/main.css"></link>' : `<link rel="stylesheet" href="//${bconfig.frontendHost}:8888/build/main.css"></link>` }


	  <!-- <link rel="stylesheet" href="/assets/css/todomvc-common.css"></link>
	  <link rel="stylesheet" href="/assets/css/todomvc-app-css.css"></link>
	  <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"/>
	  -->
	  <link rel="stylesheet" href="/assets/css/antd/antd.min.css"></link>
	  <link rel="stylesheet" href="/assets/css/antd/antd-custom/index.css"></link>
	  <link rel="stylesheet" href="/assets/css/bootstrap.bd.min.css"></link>
	  <!-- <link href="//maxcdn.bootstrapcdn.com/css/ie10-viewport-bug-workaround.css" rel="stylesheet"/> -->
	  <link href="/assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet"/>
	  <!-- <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" /> -->
	  <link href="/assets/css/font-awesome.min.css" rel="stylesheet" />
	   <link href="/assets/css/react-sidenav.bd.css" rel="stylesheet"/>
	   
	   
   	  <link rel="stylesheet" href="/assets/react-grid-layout/styles.css"></link>
	  <link rel="stylesheet" href="/assets/react-resizable/styles.css"></link>
	   
	  <link rel="stylesheet" href="/assets/css/generalStyles.css"></link>
	  
	  <style>
		<!-- TODO: refactor -->
		<!-- Fixing datepicker popup panel z-index with respect to our Add/Edit popup.  -->
		.tether-element{z-index: 1000000000000000;}
</style>

	</head>

	<body dir="${dir.dir}">
	<div id="root" class="root">${ReactDOMServer.renderToString(element)}</div>

	<!-- <script src="/env.js"></script> -->

	<script>
	  window.__RELAY_PAYLOADS__ = ${serialize(fetcher, { isJSON: true })};
	  window.fconfig = ${serialize(fconfig)};
	   window.__PRELOADED_STATE__ = ${serialize(state, { isJSON: true })};
	</script>

	<script
	  src="/assets/js/jquery-3.3.1.min.js"></script>

	${process.env.NODE_ENV === 'production' ? '<script src="/build/bundle.js"></script>' : `<script src="//${bconfig.frontendHost}:8888/build/bundle.js"></script>`}

	</body>

	</html>
 `);
}


let env = fconfig;

console.log('bconfig is --->', bconfig);
console.log('fconfig is --->', fconfig);
console.log('server.js: configuration is :  ', JSON.stringify(env, null, 4));

const PORT = bconfig.port;

const app = express();
app.disable('x-powered-by');
app.use(cookieParser())


app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/assets', express.static(path.join(__dirname, '../assets')));
/* ---- Identicon----- */
app.use('/icon', function (req,res){

let size =  req.query.size;
let value =  req.query.id;
let png = jdenticon.toPng(value, new Number(size) );
let data = png;

 res.writeHead(200, {
        'Content-Type': 'image/png',
//        'Content-disposition': 'attachment;filename=' + 'icon',
        'Content-Length': data.length
    });
    res.end(new Buffer(data, 'binary'));
});
/*------------ end Identicon ---------*/
app.use(async (req, res) => {


	let rtl = false;
	let locale = req.query.locale;

	if (!locale) {
	  locale = 'fa';
	}

	if (locale === 'fa' || locale === 'fa_IR') {
	   rtl = true;
	}
	let dir = {dir: 'rtl'};
	if (locale === 'fa') {
	   dir.dir = 'rtl';
	} else if (locale === 'en') {
	   dir.dir = 'ltr';
	}


	let headers = {...req.headers, ...{"X-XSRF-TOKEN": req.cookies[config.CSRF_TOKEN]}, };
	let fetcher = new ServerFetcher(bconfig.graphqlServerUrl, headers);
	let environment = new Environment({
	      handlerProvider: null,
	      network: Network.create((...args) => fetcher.fetch(...args)),
	      store: new Store(new RecordSource()),
	 });
	let resolver = new Resolver(environment);
	let historyMiddlewares = [queryMiddleware];

	//let fetcher = createNewFetcher(req, res);
	//let environment = createNewEnvironment(fetcher);

	const renderReady = (...args) => console.log('renderReady. args: ', args);
	const renderPending = (...args) => console.log('renderPending. args: ', args);
	const renderError = ({error, router, location}) => {

	  console.log('server-side. renderError. error: ', error, ' router: ', router, ' location: ', location);

	  if (error instanceof RedirectException) {
	    res.redirect(error.location);
	  }
	  return <div>دریافت خطا از سرور.</div>
	}

	//createRender render: render: a custom render function called in all cases, superseding renderPending, renderReady, and renderError; by default, this is createRender({ renderPending, renderReady, renderError })
	//route.render: Specify the render method to further customize how the route renders. This method should return a React element to render that element, undefined if it has a pending asynchronous component or data dependency and is not ready to render, or null to render no component. It receives an object with the following properties:

	const render = createRender({renderError});


	let preloadedState = undefined;

	const store = createStore(
	    combineReducers({
	      found: foundReducer,
			...umReducers,
			...platformReducers,
			...sinaReducers,
	    }),
	    preloadedState,
	    compose(
	      createHistoryEnhancer({
	        protocol: new ServerProtocol(req.url),
	        middlewares: [queryMiddleware],
	      }),
	      createMatchEnhancer(new Matcher(routeConfig)),
	      applyMiddleware(thunk),
	    ),
	  );


	 store.dispatch(FarceActions.init());


	 console.log('before sampleFetch await');
	 await store.dispatch(sampleFetch());
	 console.log('after sampleFetch await. state: ', JSON.stringify(store.getState(), null, 4));

	  const matchContext = { store };
	  let renderArgs;

	  try {
	    renderArgs = await getStoreRenderArgs({
	      store,
	      matchContext,
	      resolver,
	    });
	  } catch (e) {
	  	console.log('catching error: ', e);
	    if (e instanceof RedirectException) {
	      res.redirect(302, store.farce.createHref(e.location));
	      return;
	    }

	    throw e;
	  }

	  console.log('renderArgs: ', renderArgs);

	  res.status(renderArgs.error ? renderArgs.error.status : 200).send(
	    renderPageToString(
	      <Provider store={store}>
	        <RouterProvider router={renderArgs.router}>
	          {render(renderArgs)}
	        </RouterProvider>
	      </Provider>,
	      store.getState(),
	      dir,
	      fetcher,
	    ),
	  );
	});

   app.listen(PORT, () => {
     console.log(`listening on port ${PORT}`); // eslint-disable-line no-console
     console.log('Running on ', process.env.NODE_ENV === 'production' ? ' production mode' : ' development mode. NODE_ENV: ', process.env.NODE_ENV);
     console.log('Server Root: ', path.join(__dirname, '.'));

     console.log(__dirname);
     console.log(__filename);
    });





