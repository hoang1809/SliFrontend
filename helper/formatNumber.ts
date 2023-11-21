import BigNumber from 'bignumber.js';

export const formatRoundFloorDisplay = (
  value: string | number | BigNumber,
  decimalPlace = 4,
  shiftedBy = 0,
): string => {
  return new BigNumber(value || 0)
    .shiftedBy(-shiftedBy)
    .decimalPlaces(decimalPlace, BigNumber.ROUND_FLOOR)
    .toFormat();
};

export const formatRoundFloorDisplayWithCompare = (
  value: string | number | BigNumber,
  decimalPlace = 4,
  shiftedBy = 0,
): string => {
  const data = new BigNumber(value || 0)
    .shiftedBy(-shiftedBy)
    .decimalPlaces(decimalPlace, BigNumber.ROUND_FLOOR)
    .toString();
  if (new BigNumber(data).lt(0.01)) {
    return '<0.01';
  }
  return data;
};

export const convertRoundFloor = (
  value: string | number | BigNumber,
  decimalPlace = 4,
  shiftedBy = 0,
): string => {
  return new BigNumber(value || 0)
    .shiftedBy(-shiftedBy)
    .decimalPlaces(decimalPlace, BigNumber.ROUND_FLOOR)
    .toString();
};

export const nFormatter = (number: string | number, digits = 4) => {
  const SI = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const num = +number;
  let i;
  for (i = SI.length - 1; i > 0; i--) {
    if (num >= SI[i].value) {
      break;
    }
  }
  return (num / SI[i].value).toFixed(digits).replace(rx, '$1') + SI[i].symbol;
};
