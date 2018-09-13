import Article from './article';

export default class Dairy extends Article {
	constructor(props) {
		super(props);
		this.type = '日志';
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
				pass: false,
				data:["2018-09-12", "2018-09-11", "2018-09-10", "2018-09-07", "2018-09-06", "2018-09-05", "2018-09-04", "2018-09-03", "2018-08-31", "2018-08-30", "2018-08-29", "2018-08-28", "2018-08-27", "2018-08-24", "2018-08-23", "2018-08-22", "2018-08-21", "2018-08-20", "2018-08-17", "2018-08-16"]
			}]
		});
	}

}