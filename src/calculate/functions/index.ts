import * as $ from '../../UTILS/selectors';
import * as calculate from '../index';

export const setTotalPriceValue = (totalPrice: string): void => {
    $.totalPurchasePrice.nextElementSibling?.classList.add('active');
    $.totalPurchasePrice.classList.add('valid');
    $.totalPurchasePrice.value = totalPrice;
}

export const setNumberOfShares = (totalShares: string): void => {
    $.numberOfShares.nextElementSibling?.classList.add('active');
    $.numberOfShares.classList.add('valid');
    $.numberOfShares.value = totalShares;
}

export const createCalculateRow = (
    numberOfShares: string,
    totalPurchasePrice: number,
    brokerage: string,
    targetPrice: string,
) => {
    const targetTotal = calculate.targetTotal(numberOfShares, targetPrice, brokerage);
    const difference = calculate.difference(totalPurchasePrice, targetTotal);

    const newRow = document.createElement('tr');

    const newColBaseTotal = document.createElement('td');
    newColBaseTotal.innerHTML = totalPurchasePrice.toString();

    const newColTargetTotal = document.createElement('td');
    newColTargetTotal.innerHTML = targetTotal.toString();

    const newColDifference = document.createElement('td');
    const percentageDifference = (Math.abs(difference / totalPurchasePrice) * 100).toFixed(2);
    const displayText = `${difference}`;
    newColDifference.innerHTML = displayText;
    // superscript to show percentage profit/loss
    const superscriptEl = document.createElement('sup');
    superscriptEl.innerText = `[${percentageDifference}%]`;
    newColDifference.appendChild(superscriptEl);
    newColDifference.style.color = (difference > 0 ? 'green' : 'red');
    // X clear button to remove row
    const newColClear = document.createElement('td');
    const removeRowButton = document.createElement('i');
    const removeRowButtonClasses = ['material-icons', 'clearRow', 'red-text', 'text-darker-1'];
    removeRowButton.classList.add(...removeRowButtonClasses);
    removeRowButton.style.cursor = 'pointer';
    removeRowButton.innerHTML = 'clear';
    newColClear.appendChild(removeRowButton);
    // append all children
    newRow.appendChild(newColBaseTotal);
    newRow.appendChild(newColTargetTotal);
    newRow.appendChild(newColDifference);
    newRow.appendChild(newColClear);
    $.tableBodyCalculate.appendChild(newRow);
}
