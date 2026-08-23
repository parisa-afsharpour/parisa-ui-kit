import React, { Component } from 'react';
import { Box } from 'react-ext';

export default class ErrorPage extends Component {

	render() {

		let code = this.props.code;
		let message = null;

		if (code === 403) {
			message = "خطای دسترسی!";
		}else if (code === 404) {
			message = "صفحه درخواست شده یافت نشد!";
		}else {
			message = "خطای " + code;
		}

		let navbar = this.props.navbar;

		return (
		  <div className="h100">
              {navbar}
		      <div className="container root-container min-h100">
		      <div className="main-content">
		      	<Box>
		      		<div className="error-message" style={{textAlign: 'center'}}>
		        	{message}
		        	</div>
		        </Box>
		       </div>
		      </div>
		  </div>
		);

	}

}
