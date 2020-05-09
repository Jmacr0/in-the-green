export const getDifference = (baseTotal: number, targetTotal: number): number => {
	const difference = (targetTotal - baseTotal);
	return parseFloat(difference.toFixed(2));
}