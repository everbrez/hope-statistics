import React, {Component} from 'react';
import {Button} from 'element-react';

export default class Export extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.props.data);
  }

  render() {
    return (
      <Button onClick={this.handleClick} style={{marginTop: 20}} id={'btn'}>
        导出结果
      </Button>
    )
  }
}