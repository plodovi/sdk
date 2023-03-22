import { calculatePercentageReturn } from './calculate-percentage-return';
import { currentRate } from './current-rate';

export function finalPrice(
  item: Partial<{
    amount: number;
    quantityType: string;
    prices: any[];
    packs: any[];
    pack: number;
    quantity: number;
    price: any[];
    discount?: any;
    coupon?: any;
    selectedPack?: number;
  }>,
  region?: string,
  excludeMarketCut = false
) {
  const prices =
    item.price ||
    (
      item.quantityType !== 'volume' &&
      (item.hasOwnProperty('pack') || item.hasOwnProperty('selectedPack')) &&
      item.hasOwnProperty('packs')
        ? item.packs?.[item.pack || item.selectedPack || 0]?.price || item.price
        : item.price
    );

  const rate = currentRate(item.quantity, prices);

  rate.amount = region
    ? rate.regions[region]
    : rate.regions[Object.keys(rate.regions)[0]] || rate.amount;

  // @ts-ignore
  let toReturn = (rate.amount || 1) * item.quantity;

  if (item.discount) {
    if (excludeMarketCut) {
      const totalDiscount = calculatePercentageReturn(
        toReturn,
        item.discount.percent,
        true
      );

      toReturn = (
        toReturn -
        calculatePercentageReturn(toReturn, item.discount.percent, true) +
        calculatePercentageReturn(
          totalDiscount,
          item.discount.marketCut || 0,
          true
        )
      );
    } else {
      toReturn = calculatePercentageReturn(toReturn, item.discount.percent);
    }
  }

  if (item.coupon) {
    if (item.coupon.percentOrAmount) {
      toReturn = calculatePercentageReturn(toReturn, item.coupon.percent);
    }
  }

  return toReturn;
}
