export function calculatePercentageReturn(total: number, percentage: number, returnDeductedAmount = false) {
  if (!percentage) {
    return returnDeductedAmount ? 0 : total;
  }

  const amount = (total / 100) * percentage;

  return returnDeductedAmount ? amount : total - amount;
}
