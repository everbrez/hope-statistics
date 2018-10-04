import React from 'react';
import { Form, DatePicker, InputNumber } from 'element-react';
const { Item } = Form;

export default class Froms extends React.Component {
  constructor(props) {
    super(props);
    const {startDate, endDate, requiredNum } = this.props;
    this.state = {
      form: {
        startDate: startDate,
        endDate:  endDate,
        requiredNum: requiredNum,
      },
      rules: {
        startDate: [
          {type: 'date',required: true, message: '请输入开始时间', trigger: 'change' }
        ],
        endDate: [
          {type: 'date', required: true, message: '请输入结束时间', trigger: 'change' }
        ],
      }
    };
  }

  componentDidMount() {
      this.validate();
  }

  handleRequiredNum(form) {
    const {startDate, endDate } = form;
    const {unit, dUnit} = this.props;
    if(!startDate || !endDate) {
      return {};
    }
    startDate.setHours(0,0,0,0);
    endDate.setHours(0,0,0,0);
    let start = Math.floor(startDate / (1000 * 3600 * 24));
    let end = Math.ceil(endDate.getTime() / (1000 * 3600 * 24));
    let days = end - start;
    let weeks = Math.floor(days / 7);
    let last = days % 7;
    const startDay = startDate.getDay();
    const endDay = endDate.getDay();
    let lastDays = last - 2 > 0 ? last - 2 : 0;
    if(endDay - startDay >= 0) {
      let i = 0;
      if(startDay === 0) {
        i++;
      }
      if(startDay + last > 6) {
        i++;
      }
      lastDays = last - i;
    }
    return {
      requiredNum: Math.floor(weeks * unit) + Math.floor(lastDays * dUnit)
    };
  }

  onChange(key, value) {
    let requiredNum = {};
    let form = Object.assign({}, this.state.form, { [key]: value });
    if(key === 'startDate' || key === 'endDate') {
      requiredNum = this.handleRequiredNum(form);
      Object.assign(form, requiredNum);
    }
    this.setState({
      form,
    },() => {
      this.validate();
    });
  }

  validate() {
  const {onChange} = this.props;
  this.refs.form.validate(valid => onChange(valid, this.state.form));
  }

  reset() {
    this.refs.form.resetFields();
  }

  render() {
    const { form, rules } = this.state;
    const { startDate, endDate, requiredNum } = form;
    return (
      <Form model={form} rules={rules} ref="form" >
        <Item prop="startDate" required label="开始时间">
          <DatePicker onChange={this.onChange.bind(this, 'startDate')} value={startDate} />
        </Item>
        <Item prop="endDate" required label="结束时间">
          <DatePicker onChange={this.onChange.bind(this, 'endDate')} value={endDate} />
        </Item>
        <Item prop="requiredNum" label="要求数量" required>
        <InputNumber defaultValue={requiredNum} onChange={this.onChange.bind(this, 'requiredNum')} value={requiredNum}></InputNumber>
        </Item>
      </Form>
    );
  }
}