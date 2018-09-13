import React from 'react';
import { Steps, Message } from 'element-react';
import Dairy from '../article/dairy';
import Note from '../article/note';
import Summary from '../article/summary';
const { Step } = Steps;

export default class Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeStep: 1,
			finish: false,
		}
		this.next = this.next.bind(this);
	}

	componentWillReceiveProps(index) {
		this.setState({
			activeStep: 1,
			finish: false
		})
	}

	next() {
		let { activeStep, finish } = this.state;
		if (!finish) {
			activeStep++;
			if (activeStep >= 3) {
				finish = true;
				this.setState({ activeStep, finish })
			} else {
				this.setState({ activeStep });
			}
		} else {
			this.finish();
		}
	}

	finish() {
		Message({
			type: 'success',
			message: 'success',
			showClose: true
		});
	}

	switchContent(index,activeStep) {
		switch(index) {
			case '1': 
				return <Dairy activeStep={activeStep} next={this.next} />
			case '2': 
			return 	<Note activeStep={activeStep} next={this.next} />
			case '3': 
			return 	<Summary activeStep={activeStep} next={this.next} />
		}
	}

	render() {
		const { activeStep} = this.state;
		const {index} = this.props;
		return (
			<div className="content">
				<Steps active={activeStep}>
					<Step title="填写参数"></Step>
					<Step title="确认结果"></Step>
					<Step title="发表文章"></Step>
				</Steps>
				{this.switchContent(index ,activeStep)}
			</div>
		);
	}
}