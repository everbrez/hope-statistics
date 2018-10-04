import React, { Component } from 'react';
import { Button, Notification } from 'element-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class Export extends Component {
  onCopy(text, res) {
    if (res) {
      Notification({
        title: '导出结果',
        message: '复制HTML代码成功，请在编辑器中继续操作。',
        type: 'success'
      });
    } else {
      Notification({
        title: '导出结果',
        message: '复制失败',
        type: 'error'
      });
    }
  }

  render() {
    return (
      <CopyToClipboard text={this.props.data} onCopy={this.onCopy}>
        <Button style={{ marginTop: 20 }} >导出结果</Button>
      </CopyToClipboard>
    )
  }
}