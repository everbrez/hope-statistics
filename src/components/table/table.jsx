import React from 'react';
import { Table, Tag, Form } from 'element-react';

export default class Tables extends React.Component {
	constructor(props) {
    super(props);
		this.state = {
			columns: [
        {
          type: 'selection',
        },
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
					label: '年级',
					prop: 'grade'
				},
				{
					label: '姓名',
					prop: 'name'
				},
				{
					label: '数量',
					prop: 'num',
          filters:[
          {text: '通过',value: 1111},
          {text: '没通过',value:2333}],
				filterMethod(value, row) {
          if(value === 1111) {
            return row.pass;
          } else if(value === 2333){
            return !row.pass;
          }
          return true;
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
					label: '组别',
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
								return 'gray';
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
    const data = [{"name":"宋婧仪","grade":"15","group":"前端组","num":0,"data":[],"requireNum":5,"pass":false},{"name":"郑培钦","grade":"15","group":"前端组","num":0,"data":[],"requireNum":5,"pass":false},{"name":"雷雨","grade":"15","group":"前端组","num":0,"data":[],"requireNum":5,"pass":false},{"name":"文海平","grade":"15","group":"网管组","num":5,"data":["2018-09-28","2018-09-27","2018-09-26","2018-09-25","2018-09-24"],"requireNum":5,"pass":true},{"name":"罗丽苹","grade":"15","group":"网管组","num":4,"data":["2018-09-27","2018-09-26","2018-09-25","2018-09-24"],"requireNum":5,"pass":false},{"name":"谭贤宝","grade":"15","group":"网管组","num":4,"data":["2018-09-28","2018-09-27","2018-09-26","2018-09-25"],"requireNum":5,"pass":false},{"name":"冯泽伦","grade":"16","group":"前端组","num":2,"data":["2018-09-26","2018-09-25"],"requireNum":5,"pass":false},{"name":"林秘海","grade":"16","group":"前端组","num":2,"data":["2018-09-25","2018-09-24"],"requireNum":5,"pass":false},{"name":"胡靖元","grade":"16","group":"前端组","num":6,"data":["2018-09-30","2018-09-29","2018-09-28","2018-09-27","2018-09-26","2018-09-25"],"requireNum":5,"pass":true},{"name":"邓泳锋","grade":"16","group":"前端组","num":3,"data":["2018-09-26","2018-09-25","2018-09-24"],"requireNum":5,"pass":false},{"name":"杨利婷","grade":"16","group":"网管组","num":6,"data":["2018-09-30","2018-09-29","2018-09-28","2018-09-27","2018-09-26","2018-09-25"],"requireNum":5,"pass":true},{"name":"谈正起","grade":"16","group":"网管组","num":5,"data":["2018-09-28","2018-09-27","2018-09-26","2018-09-25","2018-09-24"],"requireNum":5,"pass":true},{"name":"贺泽芃","grade":"16","group":"网管组","num":5,"data":["2018-09-28","2018-09-27","2018-09-26","2018-09-25","2018-09-24"],"requireNum":5,"pass":true},{"name":"杨立凡","grade":"17","group":"前端组","num":3,"data":["2018-09-26","2018-09-25","2018-09-24"],"requireNum":5,"pass":false},{"name":"王羿","grade":"17","group":"网管组","num":6,"data":["2018-09-30","2018-09-29","2018-09-28","2018-09-27","2018-09-26","2018-09-25"],"requireNum":5,"pass":true},{"name":"严禧哲","grade":"18","group":"前端组","num":0,"data":[],"requireNum":5,"pass":false}];
		return (
      <Table 
      stripe={true} 
      // data={this.props.data} 
      data={data}
      columns={this.state.columns}
      onSelectChange={value=>console.log(value)} />
		);
	}
}