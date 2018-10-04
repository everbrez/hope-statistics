import Article from './article';

export default class Summary extends Article {
	constructor(props) {
		super(props);
    this.type = '小结';
    this.state.unit = 0.25;
    this.state.requiredNum = 1;

    let now = new Date();
    now.setDate(15);
    let prev = new Date();
    prev.setMonth(now.getMonth() - 1);
    prev.setDate(20);
    this.state.startDate = prev;
    this.state.endDate = now;
	}

	submit() {
		super.submit('summary');
	}
}