import * as $ from '../UTILS/selectors';
import * as calculate from '../CALCULATE/index';
import * as T from '../UTILS/types';
import API from '../UTILS/api';

// CALCULATE
export const calculateButton =

    $.calculateButton.addEventListener('click', (e): void => {
        e.preventDefault();

        let totalSharesValue = $.numberOfShares.value;
        let totalPriceValue = $.totalPurchasePrice.value;

        const purchasePriceValue = $.purchasePrice.value;
        const brokerageValue = $.brokerage.value;
        const targetPriceValue = $.targetPrice.value;

        if (!purchasePriceValue || !brokerageValue || !targetPriceValue) {
            console.log('Please complete enough relevant fields');
        }

        localStorage.setItem('brokerage', brokerageValue);

        if (!totalSharesValue && !totalPriceValue) {
            console.log('Please fill out either number of shares or a total purchase price');
        }

        if (totalSharesValue || totalPriceValue) {

            let baseTotal: number = 0;
            let totalShares: number = 0;

            //the following two if statements are to change the input value displayed
            if (totalSharesValue) {
                baseTotal = calculate.baseTotal(totalSharesValue, purchasePriceValue);
                totalPriceValue = baseTotal.toString();
                calculate.functions.setTotalPriceValue(totalPriceValue);
            }
            if (totalPriceValue) {
                //set base total as total price value for future calculations
                baseTotal = parseInt(totalPriceValue);
                totalShares = calculate.sharesTotal(totalPriceValue, purchasePriceValue);
                totalSharesValue = totalShares.toString();
                calculate.functions.setNumberOfShares(totalSharesValue);
            }

            calculate.functions.createCalculateRow(
                totalSharesValue,
                baseTotal,
                brokerageValue,
                targetPriceValue,
            );

        }
    });

// SEARCH
export const searchShare =

    $.searchShare.addEventListener('keydown', async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            $.searchHistory.style.display = 'block';
            $.tableBodySearchHistory.textContent = '';
            const currentSearchTerm: string = (e.target as HTMLInputElement).value;
            const searchResults: T.ShareInformation[] = await API.search(currentSearchTerm);
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
            if (!$.tableBodySearchHistory.hasChildNodes()) {
                console.log('nothing here,,,')
                const noResults: HTMLTableRowElement = document.createElement('tr');
                noResults.innerHTML = 'No Results Found.';
                $.tableBodySearchHistory.appendChild(noResults);
            }
        }
    });

// ATTACH ALL HISTORY RELATED EVENTS TO PARENT
export const searchHistoryEvents =

    $.searchHistory.addEventListener('click', async (e) => {
        const eTarget = (e.target as HTMLButtonElement);
        $.searchShare.value = '';
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
export const clearRow =

    $.tableBodyCalculate.addEventListener('click', (e): void => {
        const eTarget = (e.target as HTMLElement);
        if (eTarget.innerHTML === 'clear') {
            eTarget.parentElement?.parentElement?.remove();
        }
    });

// CLOSE X SEARCH AND CLEAR SEARCHBAR
export const clearSearch =

    $.closeSearch.addEventListener('click', (e): void => {
        $.searchShare.value = '';
    });