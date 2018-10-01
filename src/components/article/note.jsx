import Article from './article';

export default class Note extends Article {
	constructor(props) {
		super(props);
    this.type = '笔记';
    this.state.unit = 1;
    this.state.requiredNum = 1;
	}

	submit() {
		super.submit('note');
	}
}