import React from 'react';
import {Tabs} from 'element-react';

export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);
	}

  render() {
    const {onClick, index} = this.props;
    return (
      <Tabs activeName={index} onTabClick={onClick}>
      <Tabs.Pane label="日志" name="1">日志</Tabs.Pane>
      <Tabs.Pane label="笔记" name="2">笔记</Tabs.Pane>
      <Tabs.Pane label="小结" name="3">小结</Tabs.Pane>
    </Tabs>
    );
  }
}