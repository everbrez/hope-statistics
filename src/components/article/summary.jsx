import Article from './article';

export default class Summary extends Article {
	constructor(props) {
		super(props);
		this.type = '小结';
	}

	submit() {
		super.submit('summary');
		this.setState({
			data: [{
				name: 'summary',
				group: 'program',
				grade: '16',
				num: 1,
				requireNum: 23,
				pass: false
			}]
		});
	}
}