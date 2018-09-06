import React from 'react';
import { Form, Layout, DatePicker } from 'element-react';

const { Item } = Form;
const { Col } = Layout;

export default class Froms extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			form: {
				startDate: '',
				endDate: ''
			}
		}
	}

	render() {
		const {submitHandle = ()=>{}} = this.props;
		return (
			<Form model={this.state.form} onSubmit={() => submitHandle()}>
				<Item label="时间">
						<Col span="6">
							<Item prop="startDate" required>
								<DatePicker />
							</Item>
						</Col>
						<Col span="2">-</Col>
						<Col span="6">
							<Item prop="endDate" required>
								<DatePicker />
							</Item>
						</Col>
				</Item>
			</Form>
		);
	}
}