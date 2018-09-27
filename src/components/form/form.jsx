import React from 'react';
import { Form, DatePicker } from 'element-react';
const { Item } = Form;

export default class Froms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        startDate: null,
        endDate: null
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

  onChange(key, value) {
    
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    },() => {
      this.validate();
    });
  }

  validate() {
  const {onChange} = this.props;
  this.refs.form.validate(valid => onChange(valid, this.state.form));
  }

  render() {
    const { form, rules } = this.state;
    const { startDate, endDate } = form;
    return (
      <Form model={form} rules={rules} ref="form" >
        <Item prop="startDate" required label="开始时间">
          <DatePicker onChange={this.onChange.bind(this, 'startDate')} value={startDate} />
        </Item>
        <Item prop="endDate" required label="结束时间">
          <DatePicker onChange={this.onChange.bind(this, 'endDate')} value={endDate} />
        </Item>
      </Form>
    );
  }
}