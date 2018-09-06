import React from 'react';
import { Steps, Message } from 'element-react';
import Dairy from '../article/dairy';
const { Step } = Steps;

export default class Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeStep: 1,
			finish: false
		}
		this.next = this.next.bind(this);
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

	render() {
		const { activeStep, finish } = this.state;
		return (
			<div className="content">
				<Steps active={activeStep}>
					<Step title="填写参数"></Step>
					<Step title="确认结果"></Step>
					<Step title="发表文章"></Step>
				</Steps>
				<Dairy activeStep={activeStep} next={this.next} />
			</div>
		);
	}
}