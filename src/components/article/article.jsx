import React from 'react';
import Form from '../form/form';
import { Button, Tag, Loading } from 'element-react';
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
		const {data, load} = this.state;
		switch (activeStep) {
			case 1: return <Form onChange={this.changeHandle}></Form>;
			case 2: return <Loading loading={!load}><Table data={data}/>;</Loading>
			case 3: return <div>正在开发中。。。</div>;
			default: return <div>error</div>;
		}
	}

	changeHandle(valid, data) {
    if(valid) {
      this.props.toggleState({
        finish: true
      });
      this.setState({
        ...data
      });
    } else {
      this.props.toggleState({
        finish: false
      });
    }
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
				{this.route(activeStep)}
			</div>
		);
	}
}