export function currentRate(quantity: number = 1, originalPrices: any[] = []) {
  const prices = originalPrices.sort((a, b) => a.volume - b.volume)

  for (let i = prices.length - 1; i >= 0; i--) {
    const pr = prices[i];

    if (quantity >= pr.volume) {
      return {
        ...pr,
        index: i
      };
    }
  }

  return {
    ...prices[0],
    index: 0
  };
}
