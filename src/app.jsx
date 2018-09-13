import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
//import 'element-theme-default';

ReactDOM.render(
	<App>Hello</App>,
	document.getElementById('app'));



// import { Summaries, Notes, Dairies} from './articles';
// jQuery(document).ready(init);

// function init() {
// 	const options = {
// 		startDate : '2018-08-05',
// 		endDate : '2018-09-06'
// 	};

// 	const dairy = new Dairies();
// 	dairy.statistics(options);

// 	const note = new Notes();
// 	note.statistics(options);

// 	const summary = new Summaries();
// 	summary.statistics(options);

// }