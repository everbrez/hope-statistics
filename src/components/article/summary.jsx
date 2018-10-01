import Article from './article';

export default class Summary extends Article {
	constructor(props) {
		super(props);
		this.type = '小结';
	}

	submit() {
		super.submit('summary');
	}
}