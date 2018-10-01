import Article from './article';

export default class Dairy extends Article {
	constructor(props) {
		super(props);
		this.type = '日志';
	}

	submit() {
		super.submit('dairy');
	}

}