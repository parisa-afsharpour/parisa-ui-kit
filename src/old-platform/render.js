import React, { Component } from 'react';
import { HttpError, RedirectException } from 'found';
import { Loading } from 'react-ext';
import get from 'lodash.get';

//retry problem: server-rendering is catched by network error and shows the link but client error is
//renderCb. error:  TypeError: Cannot read property 'data' of null which is different and it is thrown
//and not catched.

export const handleRetry = (retry, e) => {
    e.preventDefault();
    retry()
}

export class R extends React.Component {

    handleRetry = (retry, e) => {
        e.preventDefault();
        retry()
    }


    render() {
        return <div>ارتباط با سرور امکانپذیر نیست. <a href="#" onClick={this.handleRetry.bind(this, this.props.retry)} >تلاش مجدد...</a> </div>;
    }

}

//TODO this route-level render method is for customizing render of specific routes and using it this way for all routes is
//anti-pattern. for this case, use createRender and leave it for customization.
//Error thrown from this method is caught in createRender.renderError
export const renderCb = ({ Component, props, error, match, retry, resolving }) => {
    if (error) {

        if (error instanceof HttpError && error.status == 401) {
            console.log('router-http-error-401');
            let url = `${match.location.pathname}`;
            throw new RedirectException(`/login?callback=${url}`)

        }

        if (retry) {
            return <R retry={retry} />
        }else {
            return <div>دریافت خطا از سرور.</div>
        }



        //Unreachable code
        if (error instanceof HttpError) {
            //throw new HttpError(error.status);
            //TODO createRender.renderError does not receive retry
            //throw error;


            return <div>دریافت خطا از سرور. <a href="#" onClick={handleRetry.bind(this, retry)} >تلاش مجدد...</a></div>
        }

        //console.log('Uncaught error: ', error, ' tyoeof error: ', typeof error);


        /*
        Network error
        "{"name":"RelayNetwork","type":"mustfix","framesToPop":2,
        "source":{"errors":[{"message":"Data fetching error: Error in calling filter method; anonymousUser lacks permission 1:3:4;","locations":null,"errorType":"ValidationError","validationErrorType":null,"description":null,"path":null,"extensions":null}]
         */

        if (error.name === 'RelayNetwork') {
            return <div>NetworkError. <a href="#" onClick={handleRetry.bind(this, retry)} >تلاش مجدد...</a></div>
        }

        /*
        type: 'system',
      errno: 'ECONNREFUSED',
      code: 'ECONNREFUSED'
         */
        if (error && error.errno === 'ECONNREFUSED') {
            //return <div>امکان ارتباط با سرور وجود ندارد. <a href="#" onClick={handleRetry.bind(this, retry)} >تلاش مجدد...</a> </div>
            //return <div>امکان ارتباط با سرور وجود ندارد. <a href="#" onClick={(e) => console.log('retry clicked')} >تلاش مجدد...</a> </div>
            return <R retry={retry} />
        }


        //throw new Error(error);
        throw error;
    }

    if (!Component || !props) {
        return <Loading />;
    }

    console.log('permissions: ', get(props, 'root.subject.permissions'));

    return <Component {...props} />;
}
