import React from 'react';
import { Layout } from 'element-react';
import Sidebar from '../sidebar/sidebar';
import Content from '../content/content';

const { Row, Col } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: '1'
    };
    this.switchContent = this.switchContent.bind(this);
  }

  switchContent(tab) {
    const {props:{name}} = tab;
    this.setState({
      index: name
    });
  }

  render() {
    const { index } = this.state;
    return (
        <Row>
          <Sidebar onClick={this.switchContent} index={index} />
          <Content index={index} />
        </Row>
    );
  }
} 