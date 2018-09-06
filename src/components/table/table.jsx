import React from 'react';
import { Table, Tag } from 'element-react';

export default class Tables extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					label: 'grade',
					prop: 'grade'
				},
				{
					label: 'name',
					prop: 'name'
				},
				{
					label: 'num',
					prop: 'num',
					render(data) {
						return (
							<span className={data.pass? "Success" : "Danger"}>
								{data.num} / {data.requireNum}
							</span>
						);
					}
				},
				{
					label: 'Tag',
					prop: 'group',
					render(data) {
						return (
							<Tag>{data.group}</Tag>
						);
					}
				}
			],
			data: this.props.data
		}


	}

	render() {
		return (
			<Table stripe={true} data={this.state.data} columns={this.state.columns}/>
		);
	}
}