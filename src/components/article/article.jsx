import React from 'react';
import Form from '../form/form';
import { Loading } from 'element-react';
import Table from '../table/table';
import { Dairies, Notes, Summaries } from '../../controller/analyse';

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    let now = new Date();
    let day = now.getDay();
    now.setDate(now.getDate() - day + 1);
    let prevTime = new Date(now.getTime());
    prevTime.setDate(prevTime.getDate() - 5);
    this.state = {
      startDate: prevTime,
      endDate: now,
      requiredNum: 5,
      unit: 1,
      data: [],
      load: true
    }
    this.type = 'article';

    this.props.onRef(this);

    this.changeHandle = this.changeHandle.bind(this);
    this.submit = this.submit.bind(this);
  }

  route(activeStep) {
    const { data, load, startDate, endDate, requiredNum, unit } = this.state;
    switch (activeStep) {
      case 1: return <Form onChange={this.changeHandle} startDate={startDate} endDate={endDate} requiredNum={requiredNum} unit={unit}></Form>;
      case 2: return <Loading loading={load}> <Table data={data} resizable /> </Loading>
      case 3: return <div>正在开发中......</div>;
      default: return <div>error</div>;
    }
  }

  changeHandle(valid, data) {
    if (valid) {
      this.props.toggleState({
        finish: true
      });
      this.setState({
        ...data
      });
    } else {
      this.props.toggleState({
        finish: false
      });
    }
  }

  async submit(type) {
    this.load();
    const data = await this.getData(type);
    this.unload(data);
  }

  
  load() {
    this.setState({
      load: true
    });
    this.props.toggleState({
      loading: true,
      finish: false
    });
  }

  unload(data) {
    this.setState({
      data,
      load: false
    })
    this.props.toggleState({
      loading: false,
      finish: true
    });
  }

  formatDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  async	getData(type = '') {
    const { startDate, endDate } = this.state;
    const options = {
      startDate:  `${this.formatDate(startDate)} 00:00:00`,
      endDate:  `${this.formatDate(endDate)} 23:59:59`
    }

    let articleType = null;

    switch (type) {
      case 'dairy':
        articleType = new Dairies(this.state.requiredNum);
        break;
      case 'note':
        articleType = new Notes(this.state.requiredNum);
        break;
      case 'summary':
        articleType = new Summaries(this.state.requiredNum);
    }

    const data = await articleType.getStatisticData(options);
    return data;
  }

  render() {
    const { activeStep } = this.props;
    return (
      <div className="article">
        {this.route(activeStep)}
      </div>
    );
  }
}