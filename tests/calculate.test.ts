import { baseTotal, targetTotal, difference } from '../src/calculate';


describe('Calculate', () => {
	describe('Difference', () => {
		describe('Returns the correct difference', () => {
			it('returns the difference between the purchased total and target sell total', () => {
				const baseTotal = 1000;
				const targetTotal = 1200;
				const calculateDifference = 200;

				const result: number = difference(baseTotal, targetTotal);
				expect(result).toBe(calculateDifference);
			});
		});
		describe('Returns to the correct decimal place', () => {
			it('returns the result to two decimal places', () => {
				const baseTotal = 1000;
				const targetTotal = 1200.12345;
				const differenceToTwoDecimalPlaces = 200.12;

				const result: number = difference(baseTotal, targetTotal);
				expect(result).toBe(differenceToTwoDecimalPlaces);
			});
		});
		describe('Returns a negative value', () => {
			it('correctly returns a negative value if target sell total is less than base total', () => {
				const baseTotal = 1000;
				const targetTotal = 800;
				const calculateDifference = -200;

				const result: number = difference(baseTotal, targetTotal);
				expect(result).toBe(calculateDifference);
			});
		})
	});

	describe('Base Total', () => {
		it('returns the base total', () => {
			const numberOfShares = '500';
			const purchasePricePerShare = '3';
			const calculateBaseTotal = 1500;

			const result: number = baseTotal(numberOfShares, purchasePricePerShare);
			expect(result).toBe(calculateBaseTotal);
		});
	});

	describe('Target Total', () => {
		it('returns the target total', () => {
			const numberOfShares = '500';
			const purchasePricePerShare = '3';
			const brokerage = '30'
			const calculateTargetTotal = 1440;

			const result: number = targetTotal(numberOfShares, purchasePricePerShare, brokerage);
			expect(result).toBe(calculateTargetTotal);
		});
	});
});
