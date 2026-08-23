import BrowserProtocol from 'farce/lib/BrowserProtocol';
import createConnectedRouter from 'found/lib/createConnectedRouter';
import queryMiddleware from 'farce/lib/queryMiddleware';
import createRender from 'found/lib/createRender';
import { Resolver } from 'found-relay';

import React from 'react';
import ReactDOM from 'react-dom';

import {routeConfig }
  from './router';

import { createNewEnvironment, createNewFetcher } from '../user-management/createEnvironment';
import PropTypes from 'prop-types';
import { ScrollManager } from 'found-scroll';
import config from './fconfig';
import { error } from '../user-management/store/counterStore';
console.log('client.js: configuration is : ', JSON.stringify(config, null, 4));

import foundReducer from 'found/lib/foundReducer';
import createHistoryEnhancer from 'farce/lib/createHistoryEnhancer';
import createMatchEnhancer from 'found/lib/createMatchEnhancer';
import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Matcher from 'found/lib/Matcher';
import FarceActions from 'farce/lib/Actions';
const fetcher = createNewFetcher();
const environment = createNewEnvironment(fetcher);
const resolver = new Resolver(environment);
const historyMiddlewares = [queryMiddleware];
import platformReducers from "./platformReducers";
import umReducers from "../user-management/umReducers";
import styles from "./mainLayout.scss";
import './../assets/css/modules/colors.scss';

const renderReady = (...args) => console.log('renderReady. args: ', args);
const renderPending = (...args) => console.log('renderPending. args: ', args);
const renderError = ({error, router, location}) => {

  console.log('client.js-renderError. props: ', error, ' router: ', router, ' location: ', location,);
  return <div>دریافت خطا از سرور.</div>
}

const render = createRender({renderError});

const renderScrollFixed = renderArgs => (
      <ScrollManager renderArgs={renderArgs}>
        {render(renderArgs)}
      </ScrollManager>
);


//const resolver = new Resolver(environment);

class ResettableRouter extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      resolver: this.createResolver(),
    };
  }

  static childContextTypes = {
    reset: PropTypes.func,
  }

  getChildContext = () => ({
    reset: this.reset,
  })

  reset = () => {
    this.setState({
      resolver: this.createResolver(),
    });
  }

  createResolver =  () => {
    const fetcher = createNewFetcher();
    //fetcher.setRouterInstance(this.router);
    const environment = createNewEnvironment(fetcher);
    return new Resolver(environment);
  }

  render() {
    let Router = this.props.router;
    let store = this.props.store;
    return <Router resolver={this.state.resolver} ref={(ref) => this.router = ref} matchContext={{ store }} />;
  }
}
let store;
(async () => {

   store = createStore(
    combineReducers({
      found: foundReducer,
      ...umReducers,
      ...platformReducers,
    }),
    window.__PRELOADED_STATE__,
    compose(
      createHistoryEnhancer({
        protocol: new BrowserProtocol(),
        middlewares: [queryMiddleware],
      }),
      createMatchEnhancer(new Matcher(routeConfig)),
      applyMiddleware(thunk),
    ),
  );
  store.dispatch(FarceActions.init());
  const Router = await createConnectedRouter({
    historyProtocol: new BrowserProtocol(),
    historyMiddlewares,
    routeConfig,
    resolver,
    render: renderScrollFixed,
  });

  let router = ReactDOM.render(
    <Provider store={store} className={styles.test}>

    <ResettableRouter router={Router} store={store} />

    </Provider>
    ,
    document.getElementById('root'),
  );


})();

//FIXME remove export and remove client import in Modal.js and PopupComponent.js. use redux Provider to get access to store.
export default store;
