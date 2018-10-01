import Article from './article';

export default class Note extends Article {
	constructor(props) {
		super(props);
		this.type = '笔记';
	}

	submit() {
		super.submit('note');
	}
}