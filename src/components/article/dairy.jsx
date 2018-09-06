import Article from './article';
import { Dairies} from '../../controller/analyse';

export default class Dairy extends Article {
	constructor(props) {
		super(props);
	}

	async submit() {
		super.submit();
		// this.setState({
		// 	data: [{
		// 		name: 'test',
		// 		group: 'qianduan',
		// 		grade: '16',
		// 		num: 1,
		// 		requireNum: 23,
		// 		pass: false
		// 	}]
		// });
		const {startDate, endDate} = this.state;
		const options = {
			startDate: this.formatDate(startDate),
			endDate: this.formatDate(endDate)
		}
		const dairy = new Dairies();
		const data = await dairy.getStatisticData(options);
		this.setState({
			data
		});
	}

	formatDate(date) {
		return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
	}
}