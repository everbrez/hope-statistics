import Article from './article';

export default class Dairy extends Article {
	constructor(props) {
		super(props);
	}

	submit() {
		super.submit('dairy');
		this.setState({
			data: [{
				name: 'dairy',
				group: 'program',
				grade: '16',
				num: 1,
				requireNum: 23,
				pass: false
			}]
		});
	}

}