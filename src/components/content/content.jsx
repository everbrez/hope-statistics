import React from 'react';
import { Steps, Message, Button } from 'element-react';
import Dairy from '../article/dairy';
import Note from '../article/note';
import Summary from '../article/summary';
const { Step } = Steps;

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxStep: 3,
      activeStep: 1,
      finish: false,
      loading: false,
    }
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.toggleState = this.toggleState.bind(this);
  }

  next() {
    const { maxStep, activeStep: step } = this.state;
    const activeStep = step < maxStep ? step + 1 : maxStep;
    this.setState({
      activeStep
    })
  }

  prev() {
    const { activeStep: step } = this.state;
    const activeStep = step > 1 ? step - 1 : 1;
    this.setState({
      activeStep
    })
  }

  finish() {
    Message({
      type: 'success',
      message: 'success',
      showClose: true
    });
  }

  toggleState(state) {
    this.setState(state);
  }

  switchContent(index, activeStep) {
    switch (index) {
      case '1':
        return <Dairy activeStep={activeStep} next={this.next} />
      case '2':
        return <Note activeStep={activeStep} next={this.next} />
      case '3':
        return <Summary activeStep={activeStep} next={this.next} />
    }
  }

  render() {
    const { activeStep, loading, maxStep, finish } = this.state;
    const { index } = this.props;
    return (
      <div className="content">
        <Steps active={activeStep} style={{ marginTop: 20 }} space={200}>
          <Step title="填写参数"></Step>
          <Step title="查询结果"></Step>
          <Step title="发表文章"></Step>
        </Steps>
        {this.switchContent(index, activeStep)}
        {activeStep > 1 ? <Button type="primary" loading={loading} onClick={this.prev}>prev</Button> : ''}
        {activeStep < maxStep ? <Button type="primary" loading={loading} onClick={this.next} disabled={!finish}>next</Button> : ''}
        {activeStep === maxStep ? <Button type="primary" loading={loading} onClick={this.finish} disabled={!finish}>finish</Button> : ''}
      </div>
    );
  }
}