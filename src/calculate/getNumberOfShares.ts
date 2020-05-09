
export const getNumberOfShares = (totalPurchasePrice: string, purchasePrice: string): number => {
    const totalShares: number = Math.floor(parseFloat(totalPurchasePrice) / parseFloat(purchasePrice));
    return totalShares;
};