import React from 'react';
import Form from '../form/form';
import { Button, Tag } from 'element-react';
import Table from '../table/table';
import { Dairies, Notes, Summaries } from '../../controller/analyse';

export default class Article extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: new Date(),
			endDate: new Date(),
			data: [],
			load: false
		}
		this.type = 'article';

		this.changeHandle = this.changeHandle.bind(this);
		this.submit = this.submit.bind(this);
	}

	route(activeStep) {
		const {startDate, endDate, data, load} = this.state;
		switch (activeStep) {
			case 1: return <Form changeHandle={this.changeHandle} startDate={startDate} endDate={endDate}></Form>;
			case 2: return <Table data={data} v-loading={!load}/>;
			case 3: return <div>正在开发中。。。</div>;
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

	submit(type) {
		const { next } = this.props;
		next();
		this.getData(type);
	}

	formatDate(date) {
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
	}

	async	getData(type = '') {
		const {startDate, endDate} = this.state;
		const options = {
			startDate: this.formatDate(startDate),
			endDate: this.formatDate(endDate)
		}

		let articleType = null;

		switch(type) {
			case 'dairy': 
				articleType = new Dairies();
				break;
			case 'note':
				articleType = new Notes();
				break;
			case 'summary': 
			articleType = new Summaries();
		}

		const data = await articleType.getStatisticData(options);
		console.log(data);
		this.setState({
			data,
			load: true
		});
	}

	render() {
		const { activeStep, next} = this.props;
		return (
			<div className="article">
				<div>
					<Tag>{this.type}</Tag>
				<Button onClick={activeStep === 1 ? this.submit : next} style={{margin: '20px'}}>{activeStep >= 3 ? '提交' : '下一步'}</Button>
				</div>
				{this.route(activeStep)}
			</div>
		);
	}
}