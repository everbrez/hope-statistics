import Article from './article';

export default class Note extends Article {
	constructor(props) {
		super(props);
	}

	submit() {
		super.submit('note');
		this.setState({
			data: [{
				name: 'note',
				group: 'program',
				grade: '16',
				num: 1,
				requireNum: 23,
				pass: false
			}]
		});
	}
}