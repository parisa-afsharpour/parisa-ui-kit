import React, { Component } from 'react';

import { connect } from "react-redux";
import { createSelector } from "reselect";
import fetch from 'isomorphic-fetch';
import { withRouter, RedirectException, HttpError } from 'found';
import Login from '../user-management/pages/login/Login';


class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  componentDidUpdate(prevProps) {
    // if (this.props.error) {
    //   this.props.dispatch({type: httpError, status: 200});
    // }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    if (!this.props.error.authenticated) {
      //return (<div>Error</div>);
      this.props.router.push('/login');
      return null;
    }

    return this.props.children; 
  }
}

const select = (state) => ({
  count: state.count,
  error: state.error,
})

const actions = (dispatch) => ({
  dispatch,
});

export default connect(select, actions)(withRouter(ErrorBoundary));