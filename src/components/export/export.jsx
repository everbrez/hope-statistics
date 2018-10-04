import React, {Component} from 'react';
import {Button, Notification} from 'element-react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default class Export extends Component {
  handleClick() {
    Notification({
      title: '导出结果',
      message: '复制成功',
      type: 'success'
    });
  }

  render() {
    return (
      <CopyToClipboard text={this.props.data}>
          <Button onClick={this.handleClick} style={{marginTop: 20}} >导出结果</Button>
      </CopyToClipboard>
    )
  }
}