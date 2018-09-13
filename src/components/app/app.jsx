import React from 'react';
import { Layout } from 'element-react';
import Sidebar from '../sidebar/sidebar';
import Content from '../content/content';

const {Row, Col} = Layout;

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			index: '1'
		};
		this.switchContent = this.switchContent.bind(this);
	}

	switchContent(index) {
		console.log(index);
		this.setState({
			index
		});
	}

	render() {
		const {index} = this.state;
		return(
			<div>
				<Row gutte="20">
					<Col span="5">
					<Sidebar onClick={this.switchContent} index={index}/>
					</Col>
					<Col span="13" offset="2">
						<Content index={index}/>
					</Col>
				</Row>
			</div>
		);
	}
} 