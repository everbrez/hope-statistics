import React from 'react';
import {Menu} from 'element-react';

const {Item} = Menu;

export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="sidebar">
				<Menu mode="vertical" theme="light" defaultActive="1">
					<Item index="1">日志</Item>
					<Item index="2">笔记</Item>
					<Item index="3">小结</Item>
				</Menu>
			</div>
		);
	}
}