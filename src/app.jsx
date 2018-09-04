import Dairies from './articles';
jQuery(document).ready(init);

function init() {
	const startDate = '2018-08-05',
		endDate = '2018-09-06';

	const dairys = new Dairies();
	dairys.getData({
		startDate,
		endDate
	}, data => {
		console.log(data);
		$('#app').text(data);
	})

}