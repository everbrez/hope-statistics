import {PersonList} from './articles';
jQuery(document).ready(init);

async function init() {
	const startDate = '2018-08-05',
		endDate = '2018-09-06';

	const dairys = new PersonList();
	const data = await dairys.getData();
	console.log(data);

}