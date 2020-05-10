import * as M from './UTILS/materialize';
import { setBrokerageFromLocalStorage } from './CALCULATE/functions';
import * as L from './LISTENERS/';
import './ASSETS/scss/index.scss';
import './ASSETS/img/og-image.png';

document.addEventListener('DOMContentLoaded', () => {

	// SET BROKERAGE IF IN LOCALSTORAGE
	setBrokerageFromLocalStorage();

	// LISTENERS
	L.calculateButton;
	L.searchHistoryEvents
	L.searchShare;
	L.clearRow;
	L.clearSearch;

	// MATERIALIZE JS
	M.tooltipElems;
	M.tooltipInstances;
	M.sidenavElems;
	M.sidenavInstances;

});
