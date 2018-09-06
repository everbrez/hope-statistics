import React from 'react';
import Form from '../form/form';
import { Button } from 'element-react';
import Table from '../table/table';

export default class Article extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: new Date(),
			endDate: new Date(),
			data: []
		}

		this.changeHandle = this.changeHandle.bind(this);
		this.submit = this.submit.bind(this);
	}

	route(activeStep) {
		const {startDate, endDate, data} = this.state;
		switch (activeStep) {
			case 1: return <Form changeHandle={this.changeHandle} startDate={startDate} endDate={endDate}></Form>;
			case 2: return <Table data={data}/>;
			case 3: return <div>article</div>;
			default: return <div>error</div>;
		}
	}

	changeHandle(prop) {
		function handle(value) {
			this.setState({
				[prop]: value
			});
		}
		return handle.bind(this);
	}

	submit() {
		const { next } = this.props;
		next();
	}

	render() {
		const { activeStep} = this.props;
		return (
			<div className="article">
				{this.route(activeStep)}
				<Button onClick={this.submit}>{activeStep >= 3 ? '提交' : '下一步'}</Button>
			</div>
		);
	}
}