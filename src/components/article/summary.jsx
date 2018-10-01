import Article from './article';

export default class Summary extends Article {
	constructor(props) {
		super(props);
    this.type = '小结';
    this.state.unit = 0.25;
    this.state.requiredNum = 1;

    let now = new Date();
    now.setDate(15);
    now.setMonth(now.getMonth() - 1);
    console.log(now)
    this.state.startDate = now;
	}

	submit() {
		super.submit('summary');
	}
}