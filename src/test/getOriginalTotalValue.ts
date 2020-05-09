export const getOriginalTotalValue = (numberOfShares: string, purchasePrice: string): number => {
	const baseTotal: number = parseInt(numberOfShares) * parseFloat(purchasePrice);
	return parseFloat(baseTotal.toFixed(2));
}