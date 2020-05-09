import * as tooltips from './UTILS/tooltips';
import * as $ from './UTILS/selectors';
import * as L from './LISTENERS/';
import './ASSETS/scss/index.scss';

document.addEventListener('DOMContentLoaded', () => {

	// SET BROKERAGE IF IN LOCALSTORAGE
	const savedBrokerage = localStorage.getItem('brokerage');
	if (savedBrokerage) $.brokerage.value = savedBrokerage;
	// TOOLTIPS
	tooltips.elems;
	tooltips.instances;

	// LISTENERS
	L.calculateButton;
	L.searchHistoryEvents
	L.searchShare;
	L.clearRow;
	L.clearSearch

});
