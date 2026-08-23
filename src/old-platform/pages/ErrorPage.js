import React, { Component } from 'react';
import { Box } from 'react-ext';
import PropTypes from 'prop-types';

export default class ErrorPage extends Component {

	render() {

		let code = this.props.code;
		let message = null;

		if (code === 403) {
			message = "خطای دسترسی!";
			return (		<div className="not-found">
				<span>401</span>
				<p>شما مجاز به  مشاهده صفحه مورد نظر نیستید.</p>

				<button onMouseDown={()=>{this.context.router.push('/entity')}} >  ورود به صفحه نخست   </button>
			</div>)
		}else if (code === 404) {
			message = "صفحه درخواست شده یافت نشد!";
			return (<div className="not-found">
				<span>404</span>
				<p>با عرض پوزش صفحه مورد نظر شما یافت نشد.</p>

				<button onMouseDown={()=>{this.context.router.push('/entity/home')}} > ورود به صفحه نخست </button>
			</div>)
		}else {
			message = "خطای " + code;
		}

		let navbar = this.props.navbar;
		return (		<div className="not-found">
			<span>401</span>
			<p>شما مجاز به  مشاهده صفحه مورد نظر نیستید.</p>

			<button onMouseDown={()=>{window.history.back()}} >  بازگشت   </button>
		</div>)

	}

}
ErrorPage.contextTypes = {
	router: PropTypes.object,
}
  