import Article from './article';

export default class Dairy extends Article {
	constructor(props) {
		super(props);
    this.type = '日志';
    this.state.unit = 5;
    this.state.dUnit = 1;
    this.state.requiredNum = 5;
	}

	submit() {
		super.submit('dairy');
	}

}