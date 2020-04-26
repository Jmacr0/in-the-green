export const getTargetTotalValue = (numberOfShares: string, targetPrice: string, brokerage: string): number => {
	const brokerageTotal: number = parseInt(brokerage) * 2;
	const targetTotal: number = parseInt(numberOfShares) * parseFloat(targetPrice);
	const targetTotalLessBrokerage: number = targetTotal - brokerageTotal;
	return parseFloat(targetTotalLessBrokerage.toFixed(2));
}