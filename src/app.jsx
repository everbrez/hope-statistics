import { Dairies, Summaries, Notes} from './articles';
jQuery(document).ready(init);

async function init() {
	const options = {
		startDate : '2018-08-05',
		endDate : '2018-09-06'
	};

	const dairys = new Dairies();
	 dairys.getData(options).then((data) => {
		 console.log(data);
	 });

	 const summaries = new Summaries();
	 summaries.getData(options).then(data => {console.log(data)});

	 const notes = new Notes();
	 notes.getData(options).then(data => {console.log(data)});

	 notes.getPersonList().then(data => console.log(data));

}