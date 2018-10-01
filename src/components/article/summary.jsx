import Article from './article';

export default class Summary extends Article {
	constructor(props) {
		super(props);
    this.type = '小结';
    this.state.unit = 0.25;
    this.state.requiredNum = 0;
	}

	submit() {
		super.submit('summary');
	}
}