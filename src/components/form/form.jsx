import React from 'react';
import { Form, DatePicker, InputNumber } from 'element-react';
const { Item } = Form;

export default class Froms extends React.Component {
  constructor(props) {
    super(props);
    const {startDate, endDate, requiredNum, unit} = this.props;
    this.state = {
      form: {
        startDate: startDate,
        endDate:  endDate,
        requiredNum: requiredNum,
        unit: unit,
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
    const {startDate, endDate, unit} = form;
    if(!startDate || !endDate) {
      return {};
    }
    let start = Math.floor(startDate.getTime() / (1000 * 60 * 60 * 24));
    let end = Math.ceil(endDate.getTime() / (1000 * 60 * 60 * 24));
    let days = Math.floor((end - start)/ 7);
    return {
      requiredNum: Math.floor(days * unit)
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