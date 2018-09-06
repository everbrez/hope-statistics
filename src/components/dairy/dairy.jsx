import React from 'react';
import Form from '../form/form';

export default class Dairy extends React.Component {
	constructor(props) {
		super(props);
	}

	route(activeStep) {
		switch(activeStep) {
			case 1: return <Form></Form>;
			case 2: return <div>result</div>;
			case 3: return <div>article</div>;
			default: return <div>error</div>;
		}
	}

		render() {
			const {activeStep} = this.props;
			return (
				<div className="dairy">
					{this.route(activeStep)}
				</div>
			);
		}
	}