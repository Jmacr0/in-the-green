import * as $ from './UTILS/selectors';
import * as calculate from './calculate/index';
import API from './UTILS/api';

import './ASSETS/scss/index.scss';

// CALCULATE
$.calculateButton.addEventListener('click', (e): void => {
	e.preventDefault();

	const baseTotal = calculate.baseTotal($.numberOfShares.value, $.purchasePrice.value);
	const targetTotal = calculate.targetTotal($.numberOfShares.value, $.targetPrice.value, $.brokerage.value);
	const difference = calculate.difference(baseTotal, targetTotal);

	const newRow = document.createElement('tr');

	const newColBaseTotal = document.createElement('td');
	newColBaseTotal.innerHTML = baseTotal.toString();

	const newColTargetTotal = document.createElement('td');
	newColTargetTotal.innerHTML = targetTotal.toString();

	const newColDifference = document.createElement('td');
	newColDifference.innerHTML = difference.toString();

	const newColClear = document.createElement('td');
	const removeRowButton = document.createElement('i');
	const removeRowButtonClasses = ['material-icons', 'clearRow', 'red-text', 'text-darker-1'];
	removeRowButton.classList.add(...removeRowButtonClasses);
	removeRowButton.style.cursor = 'pointer';
	removeRowButton.innerHTML = 'clear';
	newColClear.appendChild(removeRowButton);

	newRow.appendChild(newColBaseTotal);
	newRow.appendChild(newColTargetTotal);
	newRow.appendChild(newColDifference);
	newRow.appendChild(newColClear);
	$.tableBodyCalculate.appendChild(newRow);
});

// SEARCH
$.searchShare.addEventListener('keydown', async (e) => {
	if (e.key === "Enter") {
		e.preventDefault();
		$.searchHistory.style.display = 'block';
		$.tableBodySearchHistory.textContent = '';
		const currentSearchTerm: string = (e.target as HTMLInputElement).value;
		const searchResults = await API.search(currentSearchTerm);
		console.log(searchResults);
		for (let result of searchResults) {
			const symbol = result['1. symbol'];
			const region = result['4. region'];

			if (region !== 'Australia') {
				continue;
			}

			const newRow: HTMLTableRowElement = document.createElement('tr');

			const newColSymbol: HTMLElement = document.createElement('td');
			newColSymbol.innerHTML = symbol;
			newRow.appendChild(newColSymbol);

			const newColRegion: HTMLElement = document.createElement('td');
			newColRegion.innerHTML = region;
			newRow.appendChild(newColRegion);

			const newButtonShareDetails: HTMLButtonElement = document.createElement('button');
			newButtonShareDetails.classList.add('btn');
			newButtonShareDetails.setAttribute('data-symbol', symbol);
			newButtonShareDetails.innerHTML = 'DETAILS';
			newRow.appendChild(newButtonShareDetails);

			$.tableBodySearchHistory.appendChild(newRow);
		}
	}
})

// ATTACH ALL HISTORY RELATED EVENTS TO PARENT
$.searchHistory.addEventListener('click', async (e) => {
	const eTarget = (e.target as HTMLButtonElement);
	if ('symbol' in eTarget.dataset) {
		$.tableShareDetails.textContent = '';
		const symbol = eTarget.dataset.symbol;
		const shareDetails = await API.searchBySymbol(symbol!);

		const metaData = shareDetails['Meta Data'];
		const latestShareData = shareDetails['Time Series (5min)'];

		const latestShareKey = Object.keys(latestShareData)[0];
		const latestShareDetails = latestShareData[latestShareKey];

		const newRow = document.createElement('tr');
		const latestTime = metaData['3. Last Refreshed'];
		const newColSymbol = document.createElement('th');
		newColSymbol.innerHTML = symbol!;

		const newColDateTime = document.createElement('td');
		newColDateTime.innerHTML = latestTime;

		newRow.appendChild(newColSymbol);
		newRow.appendChild(newColDateTime);
		$.tableShareDetails.appendChild(newRow);

		for (const sharePriceAtPointInTime in latestShareDetails) {
			const newRow = document.createElement('tr');

			const newColType = document.createElement('th');
			newColType.innerHTML = sharePriceAtPointInTime;

			const newColValue = document.createElement('td');
			newColValue.innerHTML = latestShareDetails[sharePriceAtPointInTime];

			newRow.appendChild(newColType);
			newRow.appendChild(newColValue);
			$.tableShareDetails.appendChild(newRow);
		}

	}
	if ('clear' in eTarget.dataset) {
		$.searchHistory.style.display = 'none';
		$.tableBodySearchHistory.textContent = '';
		$.tableShareDetails.textContent = '';
	}
});

// CLEAR A CALCULATION ROW
$.tableBodyCalculate.addEventListener('click', (e): void => {
	const eTarget = (e.target as HTMLElement);
	if (eTarget.innerHTML === 'clear') {
		eTarget.parentElement?.parentElement?.remove();
	}
})

// CLOSE X SEARCH AND CLEAR SEARCHBAR
$.closeSearch.addEventListener('click', (e): void => {
	$.searchShare.value = '';
})