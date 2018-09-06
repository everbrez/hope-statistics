import React from 'react';
import { Layout } from 'element-react';
import Sidebar from '../sidebar/sidebar';
import Content from '../content/content';

const {Row, Col} = Layout;

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {children} = this.props;
		return(
			<div>
				<Row gutte="20">
					<Col span="5">
					<Sidebar />
					</Col>
					<Col span="13" offset="2">
						<Content />
					</Col>
				</Row>
			</div>
		);
	}
} 