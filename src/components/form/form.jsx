import React from 'react';
import { Form, DatePicker } from 'element-react';
const {Item} = Form;

export default class Froms extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const {startDate, endDate,changeHandle} = this.props;
		const model = {
			startDate, 
			endDate
		}
		return (
			<Form model={model} >
				<Item prop="startDate" required label="开始时间">
					<DatePicker onChange={changeHandle('startDate')} value={startDate} />
				</Item>
				<Item prop="endDate" required label="结束时间">
					<DatePicker onChange={changeHandle('endDate')} value={endDate} />
				</Item>
			</Form>
		);
	}
}