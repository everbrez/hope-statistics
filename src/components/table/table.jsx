import React from 'react';
import { Table, Tag, Form } from 'element-react';

export default class Tables extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					type: 'expand',
					expandPannel(data) {
						return (
						<Form>
								{data.data.map((item,index) =>(<Form.Item style={{margin: 0}}> <Tag type='success' style={{marginRight: 10}}>{index}</Tag> {item}</Form.Item>))}
            </Form>
						);
					}
				},
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
					filters:[{
						text: '通过',
						value: true
					},{
						text: '没通过',
						value: false
					}
				],
				filterMethod(value, row, column) {
					if(value === '通过') {
						return row.pass;
					} else if(value === '没通过') {
						return !row.pass;
					}
				},
					render(data) {
						return (
							<Tag type={data.pass? "success" : "danger"}>
								{data.num} / {data.requireNum}
							</Tag>
						);
					}
				},
				{
					label: 'Tag',
					prop: 'group',
					filters:[{text:'前端组', value:'前端组'},
					{text:'网管组', value:'网管组'},
					{text:'编程组', value:'编程组'},
					{text:'设计组', value:'设计组'},
					{text:'数码组', value:'数码组'}],
					filterMethod(value, row, column) {
        		return value === row.group;
					},
					render(data) {
						let selectColors = (value) => {
							switch(value) {
								case '前端组':
									return 'success';
								case '网管组':
								return 'info';
								case '编程组':
								return 'warning';
								case '设计组':
								return 'danger';
								case '数码组':
								default:
								return '';
							}
						};
						return (
							<Tag type={selectColors(data.group)}>{data.group}</Tag>
						);
					}
				}
			],
			data: this.props.data
		}
	}


	render() {
		return (
			<Table stripe={true} data={this.props.data} columns={this.state.columns}/>
		);
	}
}